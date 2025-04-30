import { supabase } from './supabaseClient';
import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw new Error(error.message);
  return data as Product[];
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
  const { error } = await supabase.from('products').insert([product]);
  if (error) throw new Error(error.message);
};

export const updateProduct = async (id: number, product: Omit<Product, 'id'>) => {
  const { error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id);
  if (error) throw new Error(error.message);
};

export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
};
