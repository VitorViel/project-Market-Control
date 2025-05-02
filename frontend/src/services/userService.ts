const API_URL = "https://syyqvxcgrahaqerlrtyg.supabase.co/rest/v1/users";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado.");

  return {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/**
 * Obter todos os usuários
 */
export const getAllUsers = async () => {
  try {
    const res = await fetch(API_URL, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resposta Supabase:", text);
      throw new Error(`Erro ao buscar usuários: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao obter os usuários");
  }
};

/**
 * Atualizar o cargo de um usuário
 */
export const updateUserRole = async (id: string, newRole: string) => {
  try {
    const res = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ role: newRole }),
    });

    if (!res.ok) {
      throw new Error(`Erro ao atualizar cargo: ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao atualizar o cargo");
  }
};

/**
 * Deletar um usuário
 */
export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Erro ao deletar usuário: ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao excluir o usuário");
  }
};

/**
 * Atualizar o nome de um usuário
 */
export const updateUserName = async (id: string, newName: string) => {
  try {
    const res = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) {
      throw new Error(`Erro ao atualizar nome: ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao atualizar o nome");
  }
};
