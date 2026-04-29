import { db } from './_lib/firebaseAdmin.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fallbackProducts = require('./_data/productos.json');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const snapshot = await db.collection('products').get();
    
    if (snapshot.empty) {
      // Si la DB está vacía, devolvemos el JSON como respaldo temporal
      return res.status(200).json(fallbackProducts);
    }

    const products = snapshot.docs.map(doc => ({
      // Aseguramos que el id del documento sea el id del producto
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    // Devolver el error en produccion para diagnostico
    return res.status(500).json({ error: error.message, stack: error.stack?.split('\n').slice(0,5) });
  }
}
