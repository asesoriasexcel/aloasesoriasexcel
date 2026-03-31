/**
 * GET /api/mis-productos
 * Retorna los productos comprados por el usuario autenticado.
 * Requiere: Authorization: Bearer <firebase-id-token>
 */
import { verifyToken } from './_lib/verifyToken.js';
import { db } from './_lib/firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  let decoded;
  try {
    decoded = await verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const snapshot = await db
    .collection('purchases')
    .where('userEmail', '==', decoded.email)
    .where('status', '==', 'completed')
    .get();

  const productIds = snapshot.docs.map((doc) => doc.data().productId);
  res.status(200).json({ productIds });
}
