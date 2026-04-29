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

  try {
    const snapshot = await db
      .collection('purchases')
      .where('userEmail', '==', decoded.email)
      .get();

    const purchases = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Sort by date descending
    purchases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    res.status(200).json({ purchases });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Error al obtener compras' });
  }
}
