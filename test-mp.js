import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-783267923482342-042718-d7b1d4ef322312b9a7f34c2b2a608149-123456789' });

async function run() {
  const preference = new Preference(client);
  try {
    const result = await preference.create({
      body: {
        items: [{
          id: '1',
          title: 'Test',
          quantity: 1,
          unit_price: 100,
          currency_id: 'CLP'
        }]
      }
    });
    console.log(result);
  } catch (error) {
    console.error("API ERROR:", error);
  }
}
run();
