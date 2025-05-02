import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import toast from "react-hot-toast";
import { ThemeToggle } from "../components/ThemeToggle";
import PageWrapper from "../components/PageWrapper";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email inválido");
      return;
    }

    setLoading(true);
    try {
      const user = await register(email, password, name);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (err: any) {
      console.error("❌ Erro no register:", err);
      toast.error(err.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center transition-colors duration-500 relative">
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

          <input
            className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Nome Completo"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              className="w-full p-2 pr-10 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Cargo
              <span
                className="ml-2 text-gray-500 cursor-help"
                title="Por segurança, todos os novos usuários são cadastrados como vendedores. Para permissões maiores, contate seu gerente."
              >
                ⓘ
              </span>
            </label>
            <input
              id="role"
              type="text"
              value="vendedor"
              disabled
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            className={`w-full py-2 rounded transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p className="mt-4 text-center text-sm">
            Já tem conta?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Faça login
            </span>
          </p>
        </div>

        <ThemeToggle />
      </div>
    </PageWrapper>
  );
}
