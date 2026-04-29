# Mercado Pago Pro - Integration & Environment Standards

This document serves as the professional standard for integrating Mercado Pago (MP) into the Aló Excel platform. It defines the architecture, security practices, and environment configuration required for a flawless checkout experience.

## 1. Architecture Choice: Checkout Pro
Our platform uses **Checkout Pro**. This is the most secure and frictionless method for our use case.
- **Why?** It redirects the user securely to the Mercado Pago environment, handling all complex compliance (PCI-DSS), tokenization, and multi-payment options without requiring us to maintain complex UI states (Bricks) or raw API integrations.
- **Flow:** 
  1. Frontend sends cart to `/api/checkout`.
  2. Backend creates a Preference and returns an `init_point`.
  3. Frontend redirects the user to the `init_point`.
  4. Post-payment, Mercado Pago redirects back to `/admin/miscompras`.
  5. Asynchronously, Mercado Pago hits our Webhook (`/api/mercadopago-webhook`) to grant the user their product licenses automatically.

## 2. Environment Variables (.env)
A professional setup requires strict separation of secrets. You must maintain an `.env` file at the root of the project (and mirror these in Vercel's Environment Variables).

**Required File:** `.env` (Must be ignored in `.gitignore`)
**Template File:** `.env.example` (Committed to the repository to serve as a guide)

### Core Variables Needed:
```env
# Token maestro para crear preferencias y leer pagos
MERCADOPAGO_ACCESS_TOKEN=APP_USR-tu-token-de-produccion

# Opcional: Clave secreta del Webhook para verificar autenticidad (si se habilita HMAC)
MERCADOPAGO_WEBHOOK_SECRET=tu-clave-secreta
```

## 3. Webhook Rules & License Allocation
- **Endpoint:** `/api/mercadopago-webhook`
- **Idempotency:** Webhooks can fire multiple times for the same payment. The code must handle the same `paymentId` safely. Currently, we record the `payment.id` in the `licenses` collection, which can be queried to prevent duplicate allocations.
- **Regex Parsing:** The webhook intelligently reads the `descripcion` or `descripcion_larga` field from the Firestore `products` collection. It expects a format like `X licencia` o `X licencias` (e.g. "2 licencias") to automatically grant access rights in the `licenses` DB.
- **Configuration in MP Dashboard:** You MUST configure the Webhook URL in your Mercado Pago Developer Dashboard under "Notificaciones Webhooks". 
  - URL: `https://tu-dominio.com/api/mercadopago-webhook`
  - Eventos a escuchar: `Pagos (payment)`

## 4. Local Development Fallbacks
To prevent developer friction, if the `MERCADOPAGO_ACCESS_TOKEN` is invalid or missing during local development, the `/api/checkout` endpoint will **gracefully degrade**. Instead of throwing a 500 server error, it will intercept the auth error and return a simulated `init_point` redirecting directly to the success URL (`/admin/miscompras?status=success`). This allows frontend UI testing without needing active credentials.
