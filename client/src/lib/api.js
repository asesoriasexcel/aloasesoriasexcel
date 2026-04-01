const API_BASE_URL = '/api';

export const getProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error('Error al cargar productos');
  const products = await res.json();
  const product = products.find((p) => String(p.id) === String(id));
  if (!product) throw new Error('Producto no encontrado');
  return product;
};
