import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { createProduct, updateProduct } from "../services/productService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
  product?: Product;
  refresh: () => void;
}

export default function ProductPopup({ onClose, product, refresh }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategory(product.category);
    }
  }, [product]);

  const handleSubmit = async () => {
    try {
      if (!name || price <= 0 || quantity < 0 || !category) {
        toast.error("Preencha todos os campos corretamente");
        return;
      }

      if (product && product.id) {
        await updateProduct(product.id, { name, price, quantity, category });
        toast.success("Produto atualizado com sucesso!");
      } else {
        await createProduct({ name, price, quantity, category });
        toast.success("Produto criado com sucesso!");
      }

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar produto");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-gray-800 dark:text-gray-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">
          {product ? "Editar Produto" : "Novo Produto"}
        </h2>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium">
            Nome
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 px-4 py-2 rounded border w-full bg-white dark:bg-gray-700"
              autoFocus
            />
          </label>

          <label className="text-sm font-medium">
            Categoria
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 px-4 py-2 rounded border w-full bg-white dark:bg-gray-700"
            />
          </label>

          <label className="text-sm font-medium">
            Preço
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-1 px-4 py-2 rounded border w-full bg-white dark:bg-gray-700"
            />
          </label>

          <label className="text-sm font-medium">
            Quantidade
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 px-4 py-2 rounded border w-full bg-white dark:bg-gray-700"
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Salvar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
