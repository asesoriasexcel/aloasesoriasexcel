import { db } from './api/_lib/firebaseAdmin.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const initialProducts = require('./api/_data/productos.json');

async function seed() {
  console.log('--- Iniciando Migración a Firestore ---');
  
  const productsCol = db.collection('products');
  
  for (const product of initialProducts) {
    const { id, ...data } = product;
    console.log(`Migrando: ${product.nombre} (ID: ${id})...`);
    
    // Usamos el ID del JSON como ID del documento en Firestore
    await productsCol.doc(id).set({
      ...data,
      updatedAt: new Date().toISOString()
    });
  }

  console.log('--- Migración completada con éxito ---');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error durante la migración:', err);
  process.exit(1);
});
