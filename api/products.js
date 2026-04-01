/**
 * GET /api/products
 * Retorna la lista de productos disponibles.
 * Por ahora lee de un archivo JSON estático; luego puede venir de Firestore.
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const productosList = require('./_data/productos.json');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  res.status(200).json(productosList);
}
