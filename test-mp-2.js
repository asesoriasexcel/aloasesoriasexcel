import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-783267923482342-042718-d7b1d4ef322312b9a7f34c2b2a608149-123456789' });

const preferenceItems = [{
  id: 'item-1',
  title: 'Producto Aló Excel',
  quantity: 1,
  unit_price: 1000,
  currency_id: 'CLP',
}];

const preference = new Preference(client);

async function run() {
  try {
    const result = await preference.create({
      body: {
        items: preferenceItems,
        payer: {
          email: 'usuario@test.com'
        },
        back_urls: {
          success: `http://localhost/admin/miscompras?status=success`,
          failure: `http://localhost/carrito?status=failure`,
          pending: `http://localhost/admin/miscompras?status=pending`
        },
        auto_return: 'approved',
        notification_url: `http://localhost/api/mercadopago-webhook`,
        external_reference: 'usuario@test.com'
      }
    });
    console.log(result.init_point);
  } catch (err) {
    console.error("ERROR CAUGHT:");
    console.error(err.message);
    if (err.cause) console.error("CAUSE:", err.cause);
    if (err.response) console.error("RESPONSE:", err.response);
  }
}
run();
