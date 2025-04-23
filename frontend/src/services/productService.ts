import { Product } from "../types/Product";

const API = "http://localhost:3001";

// ✅ Adiciona token nas requisições
const getAuth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ✅ Buscar todos os produtos
export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API}/products`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuth(),
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
};

// ✅ Adicionar novo produto
export const addProduct = async (product: Product) => {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuth(),
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Erro ao adicionar produto");
};

// ✅ Atualizar produto existente
export const updateProduct = async (product: Product) => {
  const res = await fetch(`${API}/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuth(),
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Erro ao atualizar produto");
};

// ✅ Excluir produto
export const deleteProduct = async (id: string) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuth(),
    },
  });

  if (!res.ok) throw new Error("Erro ao excluir produto");
};
