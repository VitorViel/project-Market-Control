import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../services/userService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface User {
  id: number;
  email: string;
  fullName: string;
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
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    } catch {
      toast.error("Erro ao atualizar cargo");
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Usuário deletado com sucesso!");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      toast.error("Erro ao deletar usuário");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Usuários cadastrados
          </h2>
          <button
            className="text-red-600 hover:underline"
            onClick={onClose}
            title="Fechar janela"
          >
            ❌ Fechar
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        ) : (
          <table className="w-full text-left border-t border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="text-sm text-gray-700 dark:text-gray-300">
                <th className="p-2">Nome</th>
                <th className="p-2">Email</th>
                <th className="p-2">Cargo</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t dark:border-gray-700 text-sm">
                  <td className="p-2">{user.fullName}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <select
                      className="border rounded px-2 py-1 bg-white text-black dark:text-black"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="vendedor">vendedor</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(user.id)}
                      title="Excluir usuário"
                    >
                      🗑️ Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
};

export default UserListPopup;
