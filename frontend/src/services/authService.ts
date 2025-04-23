const API = "http://localhost:3001"; // ajuste se necessário

export const register = async (email: string, password: string, fullName: string) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fullName }),
  });

  if (!res.ok) throw new Error("Erro ao registrar");
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Erro no login");

  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user)); // <-- aqu  
};

export const getToken = () => localStorage.getItem("token");
export const logout = () => localStorage.removeItem("token");
