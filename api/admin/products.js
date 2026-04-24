import { db } from '../_lib/firebaseAdmin.js';
import { verifyToken } from '../_lib/verifyToken.js';

const ADMIN_EMAILS = ['aloasesoriasexcel@gmail.com']; // Emails con acceso administrativo

export default async function handler(req, res) {
  console.log('--- NUEVA PETICIÓN RECIBIDA EN ADMIN API ---');
  console.log(`Método: ${req.method}, URL: ${req.url}`);
  
  // 1. Verificar Autenticación
  let decoded;
  try {
    console.log('[ADMIN API] Verificando token...');
    decoded = await verifyToken(req);
    console.log(`[ADMIN API] Usuario verificado: ${decoded.email}`);
    
    if (!ADMIN_EMAILS.includes(decoded.email)) {
      console.warn(`[ADMIN API] Acceso denegado para: ${decoded.email}`);
      return res.status(403).json({ error: 'Acceso denegado. No eres administrador.' });
    }
  } catch (error) {
    console.error('[ADMIN API] Error de autenticación:', error.message);
    return res.status(401).json({ error: `No autorizado: ${error.message}` });
  }

  // 2. Manejar Métodos
  const { method } = req;
  const productsCol = db.collection('products');
  console.log(`[ADMIN API] Procesando operación para coleccion 'products'...`);

  try {
    if (method === 'POST') {
      const { id, ...productData } = req.body;
      console.log(`[ADMIN API] Intentando guardar producto: ${id}`);
      
      if (!id) return res.status(400).json({ error: 'ID de producto es requerido' });

      await productsCol.doc(id).set({
        ...productData,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return res.status(200).json({ message: 'Producto guardado con éxito', id });
    }

    if (method === 'DELETE') {
      // Eliminar Producto
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID requerido para eliminar' });
      await productsCol.doc(id).delete();
      return res.status(200).json({ message: 'Producto eliminado' });
    }

    res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Error en Admin API:', error);
    res.status(500).json({ error: `Error interno: ${error.message}` });
  }
}
