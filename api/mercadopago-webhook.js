import { db } from './_lib/firebaseAdmin.js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializar MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-783267923482342-042718-d7b1d4ef322312b9a7f34c2b2a608149-123456789' });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { type, data } = req.body;
  const paymentId = req.query.data?.id || data?.id;

  if (type === 'payment' && paymentId) {
    try {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: paymentId });

      if (payment.status === 'approved') {
        const userEmail = payment.external_reference || payment.payer?.email;
        const items = payment.additional_info?.items || [];
        
        for (const item of items) {
           // Buscamos si el producto requiere licencias basado en su descripción o título
           let descripcion = "";
           let idArticulo = Number(item.id);
           
           const productSnapshot = await db.collection('products').where('id_articulo', '==', idArticulo).get();
           if (!productSnapshot.empty) {
               const productData = productSnapshot.docs[0].data();
               descripcion = productData.descripcion || productData.descripcion_larga || "";
           } else {
               // Fallback por si la id es el doc.id
               const docRef = await db.collection('products').doc(String(item.id)).get();
               if (docRef.exists) {
                   const productData = docRef.data();
                   descripcion = productData.descripcion || productData.descripcion_larga || "";
               }
           }
           
           // Buscar si en la descripción indica cantidad de licencias: ej: "5 licencias", "1 licencia"
           const match = descripcion.match(/(\d+)\s*licencia/i);
           if (match) {
               const numLicenses = parseInt(match[1]);
               const totalLicensesToGrant = numLicenses * Number(item.quantity);
               
               console.log(`Otorgando ${totalLicensesToGrant} licencias a ${userEmail} por producto ${item.id}`);
               
               for(let i = 0; i < totalLicensesToGrant; i++) {
                   await db.collection('licenses').add({
                       userEmail: userEmail,
                       productId: item.id,
                       productName: item.title,
                       assignedAt: new Date().toISOString(),
                       status: 'active',
                       paymentId: payment.id
                   });
               }
           }
        }
        
        // Guardar la compra en la base de datos
        await db.collection('purchases').add({
          paymentId: payment.id,
          userEmail: userEmail,
          items: items,
          date: new Date().toISOString(),
          total: payment.transaction_amount,
          status: payment.status
        });
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error('Error procesando webhook:', error);
      res.status(500).send('Error');
    }
  } else {
    res.status(200).send('Ignored');
  }
}
