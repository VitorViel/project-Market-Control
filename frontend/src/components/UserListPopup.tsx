import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../services/userService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface Props {
  onClose: () => void;
}

const UserListPopup = ({ onClose }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      await updateUserRole(id, newRole);
      toast.success("Cargo atualizado!");
      fetchUsers();
    } catch (err) {
      toast.error("Erro ao atualizar cargo");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja remover este usuário?")) {
      try {
        await deleteUser(id);
        toast.success("Usuário deletado com sucesso");
        fetchUsers();
      } catch (err) {
        toast.error("Erro ao deletar usuário");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-2xl text-gray-800 dark:text-gray-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">Lista de Usuários</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Nome</th>
                <th className="p-2">Email</th>
                <th className="p-2">Cargo</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t dark:border-gray-700">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">
                    {u.email === "admin@teste" ? (
                      <span className="text-sm font-medium text-purple-600">admin</span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-white dark:bg-gray-700 border rounded px-2 py-1"
                      >
                        <option value="vendedor">vendedor</option>
                        <option value="admin">admin</option>
                      </select>
                    )}
                  </td>
                  <td className="p-2">
                    {u.email !== "admin@teste" && (
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0px 0px 8px rgba(239, 68, 68, 0.6)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1 transition"
                        onClick={() => handleDelete(u.id)}
                        title="Excluir usuário"
                      >
                        <Trash2 size={16} /> Excluir
                      </motion.button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserListPopup;
