import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { getProducts, deleteProduct } from "../services/productService";
import ProductPopup from "../components/ProductPopup";
import { useNavigate } from "react-router-dom";
import UserListPopup from "../components/UserListPopup";
import UserAvatar from "../components/UserAvatar";
import { ThemeToggle } from "../components/ThemeToggle";
import PageWrapper from "../components/PageWrapper"; // 💫 Import do wrapper com animação
import { AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const navigate = useNavigate();
  const [userPopupOpen, setUserPopupOpen] = useState(false);

  let user = {};
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser) user = JSON.parse(savedUser);
  } catch {
    user = {};
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      alert("Erro ao carregar produtos");
      navigate("/");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja excluir este produto?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setPopupOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-gray-100 transition-colors duration-500 relative">

        {/* Topo com usuário, avatar e botões */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Bem-vindo, {(user as any).fullName || "Usuário"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Cargo: {(user as any).role || "Não informado"}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 relative">
            {(user as any).fullName && (
              <UserAvatar
                name={(user as any).fullName}
                role={(user as any).role}
                onLogout={handleLogout}
              />
            )}

            {(user as any).role === "admin" && (
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={() => setUserPopupOpen(true)}
              >
                Lista de usuários
              </button>
            )}
          </div>
        </div>

        {/* Título e botão */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Produtos</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setEditingProduct(undefined);
              setPopupOpen(true);
            }}
          >
            Adicionar Produto
          </button>
        </div>

        <AnimatePresence>
          {userPopupOpen && (
            <UserListPopup onClose={() => setUserPopupOpen(false)} />
          )}
        </AnimatePresence>

        {/* Lista de produtos */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          {products.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum produto cadastrado.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Nome</th>
                  <th className="p-2">Preço</th>
                  <th className="p-2">Estoque</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">R$ {p.price.toFixed(2)}</td>
                    <td className="p-2">{p.quantity}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        className="text-yellow-600"
                        onClick={() => handleEdit(p)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(p.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <AnimatePresence>
          {popupOpen && (
            <ProductPopup
              onClose={() => setPopupOpen(false)}
              refresh={fetchProducts}
              product={editingProduct}
            />
          )}
        </AnimatePresence>

        <ThemeToggle />
      </div>
    </PageWrapper>
  );
}
