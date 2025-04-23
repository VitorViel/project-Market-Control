import React, { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { addProduct, updateProduct } from "../services/productService";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  refresh: () => void;
  product?: Product;
}

const ProductPopup = ({ onClose, refresh, product }: Props) => {
  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    quantity: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleSubmit = async () => {
    const newErrors = {
      id: !form.id,
      name: !form.name,
    };

    setErrors(newErrors);

    if (newErrors.id || newErrors.name) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    try {
      if (product) {
        await updateProduct(form);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await addProduct(form);
        toast.success("Produto adicionado com sucesso!");
      }
      refresh();
      onClose();
    } catch (err) {
      toast.error("Erro ao salvar o produto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {product ? "Editar" : "Novo"} Produto
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
          <input
            className={`w-full p-2 border rounded ${errors.id ? "border-red-500" : ""}`}
            disabled={!!product}
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""}`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Salvar
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
