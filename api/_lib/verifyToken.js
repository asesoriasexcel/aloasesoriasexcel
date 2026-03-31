import { adminAuth } from './firebaseAdmin.js';

/**
 * Verifica el Firebase ID token del header Authorization.
 * @param {Request} req
 * @returns {object} decodedToken con uid, email, etc.
 * @throws si el token es inválido o falta
 */
export async function verifyToken(req) {
  const authHeader = req.headers['authorization'] ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    throw new Error('Token no proporcionado');
  }
  const idToken = authHeader.slice(7);
  return adminAuth.verifyIdToken(idToken);
}
