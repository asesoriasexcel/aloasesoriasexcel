import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

if (!admin.apps.length) {
  let serviceAccount;
  const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]:)/, '$1');
  const localKeyName = 'aloasesoriasexcel-325ec-firebase-adminsdk-fbsvc-fb3161777b.json';
  
  // Buscamos relativo a este archivo (_lib/firebaseAdmin.js)
  // Subimos dos niveles hasta llegar a la raíz
  const firebaseDirPath = path.resolve(__dirname, '../../firebase', localKeyName);
  const rootPath = path.resolve(__dirname, '../../', localKeyName);

  if (fs.existsSync(firebaseDirPath)) {
    console.log(`[FIREBASE ADMIN] Llave encontrada en: ${firebaseDirPath}`);
    serviceAccount = JSON.parse(fs.readFileSync(firebaseDirPath, 'utf8'));
  } else if (fs.existsSync(rootPath)) {
    console.log(`[FIREBASE ADMIN] Llave encontrada en: ${rootPath}`);
    serviceAccount = JSON.parse(fs.readFileSync(rootPath, 'utf8'));
  } else {
    // Si no está el archivo, usamos la variable de entorno
    console.warn('[FIREBASE ADMIN] No se encontró el JSON local, buscando en ENV...');
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      try {
        serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      } catch (err) {
        console.error('[FIREBASE ADMIN] Error al parsear GOOGLE_SERVICE_ACCOUNT_JSON:', err);
        throw new Error('CRÍTICO: GOOGLE_SERVICE_ACCOUNT_JSON no es un JSON válido.');
      }
    } else {
        throw new Error(`CRÍTICO: No se encontró el archivo ${localKeyName}.`);
    }
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'aloasesoriasexcel-325ec',
  });
  console.log('[FIREBASE ADMIN] Inicializado correctamente');
}

export const db = admin.firestore();
export const adminAuth = admin.auth();
