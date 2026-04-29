import { db } from './api/_lib/firebaseAdmin.js';
async function run() {
  const collections = await db.listCollections();
  for (const collection of collections) {
    console.log(`Collection: ${collection.id}`);
    const snapshot = await collection.limit(1).get();
    snapshot.forEach(doc => {
      console.log(`  Doc: ${doc.id}`);
      console.log(`  Data: ${JSON.stringify(doc.data())}`);
    });
  }
}
run().catch(console.error);
