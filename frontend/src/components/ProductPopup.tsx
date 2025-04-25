import React, { useState, useEffect, useRef } from "react";
import { Product } from "../types/Product";
import { addProduct, updateProduct } from "../services/productService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";

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
  const idInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) setForm(product);
    idInputRef.current?.focus();
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          {product ? "Editar" : "Novo"} Produto
        </h2>

        {/* Campos de input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID</label>
          <input
            ref={idInputRef}
            className={`w-full p-2 border rounded bg-white text-black dark:text-black ${errors.id ? "border-red-500" : ""}`}
            disabled={!!product}
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
          <input
            className={`w-full p-2 border rounded bg-white text-black dark:text-black ${errors.name ? "border-red-500" : ""}`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preço</label>
          <input
            className="w-full p-2 border rounded bg-white text-black dark:text-black"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantidade</label>
          <input
            className="w-full p-2 border rounded bg-white text-black dark:text-black"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
          />
        </div>

        {/* Botões */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.6)", // Azul para salvar
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleSubmit}
            title="Salvar Produto"
          >
            <Save size={18} /> Salvar
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgba(156, 163, 175, 0.6)", // Cinza para cancelar
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            onClick={onClose}
            title="Cancelar"
          >
            <X size={18} /> Cancelar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPopup;
