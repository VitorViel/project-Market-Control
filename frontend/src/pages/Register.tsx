import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import toast from "react-hot-toast";
import { ThemeToggle } from "../components/ThemeToggle";
import PageWrapper from "../components/PageWrapper"; // 💫 Wrapper animado

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(email, password, fullName);
      toast.success("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (err) {
      toast.error("Erro ao cadastrar");
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
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={handleRegister}
          >
            Cadastrar
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
