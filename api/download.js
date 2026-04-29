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

  // Verificar que el usuario tiene una compra aprobada que incluye este producto
  const purchasesSnap = await db
    .collection('purchases')
    .where('userEmail', '==', decoded.email)
    .where('status', '==', 'approved')
    .get();

  if (purchasesSnap.empty) {
    return res.status(403).json({ error: 'No tienes acceso a este producto' });
  }

  const hasPurchase = purchasesSnap.docs.some(doc => {
    const items = doc.data().items || [];
    return items.some(item => String(item.id) === String(productId));
  });

  if (!hasPurchase) {
    return res.status(403).json({ error: 'No tienes acceso a este producto' });
  }

  // Obtener driveFileName del producto (buscar por doc ID primero, luego por id_articulo)
  let driveFileName = null;

  const docRef = await db.collection('products').doc(String(productId)).get();
  if (docRef.exists) {
    driveFileName = docRef.data().driveFileName;
  }

  if (!driveFileName) {
    const idNumerico = Number(productId);
    if (!isNaN(idNumerico)) {
      const snap = await db
        .collection('products')
        .where('id_articulo', '==', idNumerico)
        .limit(1)
        .get();
      if (!snap.empty) {
        driveFileName = snap.docs[0].data().driveFileName;
      }
    }
  }

  if (!driveFileName) {
    return res.status(404).json({ error: 'Archivo no configurado para este producto' });
  }

  const fileId = await findFileByName(driveFileName);
  if (!fileId) {
    return res.status(404).json({ error: 'Archivo no encontrado en Drive' });
  }

  const url = await getDownloadUrl(fileId);
  res.status(200).json({ url });
}
