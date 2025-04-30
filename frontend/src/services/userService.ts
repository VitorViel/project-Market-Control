const API_URL = "https://syyqvxcgrahaqerlrtyg.supabase.co/rest/v1/users"; // URL correta da tabela
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5eXF2eGNncmFoYXFlcmxydHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTI2MDEsImV4cCI6MjA2MTU4ODYwMX0.eqw48cOPn3uSBAmkw5V-3dFdJ_UxQnqVHm2d_WFFTBQ";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer hThWP8/+y5YS4xGFtqwiA7nPCoSPsafYErtsaHYePiIY8H2mGtw8ypR+HExW9TjnQflX/IEllQLbTeeaYQJgoQ==`,
  "Content-Type": "application/json",
};

/**
 * Obter todos os usuários
 */
export const getAllUsers = async () => {
  try {
    const res = await fetch(API_URL, { headers });
    if (!res.ok) {
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
export const updateUserRole = async (id: number, newRole: string) => {
  try {
    const res = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers,
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
export const deleteUser = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers,
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
