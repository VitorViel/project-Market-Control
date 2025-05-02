import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../types/Product";
import { getProducts, deleteProduct } from "../services/productService";
import ProductPopup from "../components/ProductPopup";
import { useNavigate } from "react-router-dom";
import UserListPopup from "../components/UserListPopup";
import UserAvatar from "../components/UserAvatar";
import { ThemeToggle } from "../components/ThemeToggle";
import PageWrapper from "../components/PageWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [userPopupOpen, setUserPopupOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [userName, setUserName] = useState("Usuário");
  const [userRole, setUserRole] = useState("Não informado");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const name = user.user_metadata?.name || "Usuário";
        const role = user.role || "Não informado";
        setUserName(name);
        setUserRole(role);
      }
    } catch {
      setUserName("Usuário");
      setUserRole("Não informado");
    }
  }, []);

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

  const handleDelete = async (id: number) => {
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

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? p.category === category : true;
      return matchesName && matchesCategory;
    });
  }, [products, search, category]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
  }, [products]);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-gray-100 transition-colors duration-500 relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">Bem-vindo, {userName}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Cargo: {userRole}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {userName && (
              <UserAvatar
                name={userName}
                role={userRole}
                onLogout={handleLogout}
              />
            )}

            {userRole === "admin" && (
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={() => setUserPopupOpen(true)}
              >
                Lista de usuários
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
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

        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome..."
            className="px-4 py-2 rounded border w-full sm:w-64 bg-white dark:bg-gray-800"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded border w-full sm:w-64 bg-white dark:bg-gray-800"
            >
              <option value="">Todas as categorias</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {(search || category) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="text-sm px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 rounded transition whitespace-nowrap"
              >
                🧹
              </button>
            )}
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum produto encontrado.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Nome</th>
                  <th className="p-2">Categoria</th>
                  <th className="p-2">Preço</th>
                  <th className="p-2">Estoque</th>
                  <th className="p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="border-t dark:border-gray-700">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.category}</td>
                    <td className="p-2">R$ {p.price.toFixed(2)}</td>
                    <td className="p-2">{p.quantity}</td>
                    <td className="p-2 flex gap-2">
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0px 0px 8px rgba(234, 179, 8, 0.6)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="text-yellow-500 hover:text-yellow-600 flex items-center gap-1 transition"
                        onClick={() => handleEdit(p)}
                        title="Editar produto"
                      >
                        <Pencil size={16} /> Editar
                      </motion.button>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0px 0px 8px rgba(239, 68, 68, 0.6)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1 transition"
                        onClick={() => handleDelete(p.id)}
                        title="Excluir produto"
                      >
                        <Trash2 size={16} /> Excluir
                      </motion.button>
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
          {userPopupOpen && userRole === "admin" && (
            <UserListPopup onClose={() => setUserPopupOpen(false)} />
          )}
        </AnimatePresence>

        <ThemeToggle />
      </div>
    </PageWrapper>
  );
}
