import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  updateUserName,
} from "../services/userService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface Props {
  onClose: () => void;
}

const UserListPopup = ({ onClose }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [editedUsers, setEditedUsers] = useState<{
    [key: string]: Partial<User>;
  }>({});
  const [isSaving, setIsSaving] = useState(false);

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

  const handleRoleChange = (id: string, newRole: string) => {
    setEditedUsers((prev) => ({
      ...prev,
      [id]: { ...prev[id], role: newRole },
    }));
  };

  const handleNameChange = (id: string, newName: string) => {
    setEditedUsers((prev) => ({
      ...prev,
      [id]: { ...prev[id], name: newName },
    }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      for (const userId in editedUsers) {
        const updates = editedUsers[userId];
        if (updates.name) await updateUserName(userId, updates.name);
        if (updates.role) await updateUserRole(userId, updates.role);
      }
      toast.success("Alterações salvas com sucesso!");
      setEditedUsers({});
      fetchUsers();
    } catch (err) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    const isAdminFix = email.toLowerCase() === "admin@teste.com";
    if (isAdminFix) return;

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
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setCurrentUserId(user.id || "");
    setUserRole(user.role || "");
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
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl text-gray-800 dark:text-gray-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Lista de Usuários</h2>

        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="p-2 font-semibold">ID</th>
                  <th className="p-2 font-semibold">Nome</th>
                  <th className="p-2 font-semibold">Email</th>
                  <th className="p-2 font-semibold">Cargo</th>
                  <th className="p-2 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const emailLower = u.email.toLowerCase();
                  const isAdminFix = emailLower === "admin@teste.com";
                  const canEditName =
                    userRole === "admin" &&
                    (u.role === "vendedor" || u.id === currentUserId);

                  const pendingChanges = editedUsers[u.id] || {};

                  return (
                    <tr key={u.id} className="border-t dark:border-gray-700">
                      <td className="p-2 break-all">{u.id}</td>
                      <td className="p-2">
                        {canEditName ? (
                          <input
                            value={pendingChanges.name ?? u.name}
                            onChange={(e) =>
                              handleNameChange(u.id, e.target.value)
                            }
                            className="w-full px-2 py-1 text-sm rounded border dark:bg-gray-700 dark:border-gray-600"
                          />
                        ) : (
                          u.name
                        )}
                      </td>
                      <td className="p-2">{u.email}</td>
                      <td className="p-2">
                        {isAdminFix ? (
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-600 text-white shadow">
                            admin
                          </span>
                        ) : (
                          <select
                            value={
                              (pendingChanges.role ?? u.role) || "vendedor"
                            }
                            onChange={(e) =>
                              handleRoleChange(u.id, e.target.value)
                            }
                            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm rounded px-2 py-1"
                          >
                            <option value="vendedor">vendedor</option>
                            <option value="admin">admin</option>
                          </select>
                        )}
                      </td>
                      <td className="p-2">
                        {!isAdminFix && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 text-red-500 hover:text-white hover:bg-red-600 transition px-2 py-1 rounded text-sm border border-red-500"
                            onClick={() => handleDelete(u.id, u.email)}
                          >
                            <Trash2 size={16} /> Excluir
                          </motion.button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-6">
          {Object.keys(editedUsers).length > 0 && (
            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mr-2 disabled:opacity-50"
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </button>
          )}
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
