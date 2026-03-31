const API_BASE_URL = 'http://localhost:8000/api';

export const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE_URL}/products/${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/categories/`);
  if (!res.ok) throw new Error('Error al cargar categorías');
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}/`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
};
