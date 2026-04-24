import { db } from './api/_lib/firebaseAdmin.js';

async function testConnection() {
  console.log('--- Probando Conexión a Firestore ---');
  try {
    const testDoc = db.collection('test_connection').doc('check');
    await testDoc.set({
      timestamp: new Date().toISOString(),
      message: 'Probando permisos desde el servidor local'
    });
    console.log('✅ ¡ÉXITO! Se pudo escribir en Firestore.');
    
    const snap = await testDoc.get();
    console.log('✅ ¡ÉXITO! Se pudo leer de Firestore:', snap.data());
    
    await testDoc.delete();
    console.log('✅ ¡ÉXITO! Se pudo borrar el documento de prueba.');
  } catch (error) {
    console.error('❌ ERROR FATAL:', error.message);
    if (error.code === 7) {
      console.error('CONSEJO: El error 7 significa que el correo en tu JSON NO tiene el rol de "Administrador de Cloud Datastore" en la Consola de Google Cloud.');
    }
  }
}

testConnection();
