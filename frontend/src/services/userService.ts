const API = "http://localhost:3001";

const getAuth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ✅ Buscar todos os usuários (apenas para admin)
export const getAllUsers = async () => {
  const res = await fetch(`${API}/users`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuth(),
    },
  });

  if (!res.ok) throw new Error("Erro ao carregar usuários");
  return res.json();
};

// ✅ Atualizar cargo do usuário (admin ↔ vendedor)
export const updateUserRole = async (id: number, role: string) => {
  const res = await fetch(`${API}/users/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuth(),
    },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) throw new Error("Erro ao atualizar cargo");
};
