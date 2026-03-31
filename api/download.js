/**
 * GET /api/download?productId=xxx
 * Genera un link de descarga temporal para un producto comprado.
 * Requiere: Authorization: Bearer <firebase-id-token>
 * Verifica que el usuario haya comprado el producto antes de dar acceso.
 */
import { verifyToken } from './_lib/verifyToken.js';
import { db } from './_lib/firebaseAdmin.js';
import { findFileByName, getDownloadUrl } from './_lib/googleDrive.js';

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

  const { productId } = req.query;
  if (!productId) {
    return res.status(400).json({ error: 'productId requerido' });
  }

  // Verificar que el usuario tiene la compra completada
  const snapshot = await db
    .collection('purchases')
    .where('userEmail', '==', decoded.email)
    .where('productId', '==', productId)
    .where('status', '==', 'completed')
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.status(403).json({ error: 'No tienes acceso a este producto' });
  }

  // El archivo en Drive debe llamarse igual que el productId (ej: "producto-001.xlsm")
  const purchase = snapshot.docs[0].data();
  const fileName = purchase.driveFileName;

  if (!fileName) {
    return res.status(404).json({ error: 'Archivo no configurado para este producto' });
  }

  const fileId = await findFileByName(fileName);
  if (!fileId) {
    return res.status(404).json({ error: 'Archivo no encontrado en Drive' });
  }

  const url = await getDownloadUrl(fileId);
  res.status(200).json({ url });
}
