# README Dev — Asesorías Excel

## Estructura
- `/client` — React + Vite (Frontend)
- `/server` — Django + DRF + PostgreSQL (Backend)

---

## Levantar el proyecto

**Todo de una vez (desde la raíz):**
```powershell
npm run dev
```

**Por separado:**
```powershell
# Backend
cd server && .\venv\Scripts\activate && python manage.py runserver

# Frontend
cd client && npm run dev
```

---

## Base de datos

- Motor: PostgreSQL (servicio `postgresql-x64-16`, puerto 5432)
- Nombre: `aloasesoriasexcel2`
- Configurar contraseña en `server/asesorias_backend/settings.py` → `PASSWORD`

**Primera vez:**
```powershell
cd server
.\venv\Scripts\activate
python manage.py migrate
python manage.py createsuperuser
```

**Tras cambios en modelos:**
```powershell
python manage.py makemigrations
python manage.py migrate
```

---

## Instalar dependencias

**Backend** (tras modificar requirements.txt):
```powershell
cd server
.\venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend** (tras modificar package.json):
```powershell
cd client
npm install
```

---

## URLs locales

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173/asesoriasexcel/ |
| Backend API | http://localhost:8000/api/ |
| Admin Django | http://localhost:8000/admin/ |

---

## Credenciales pendientes de configurar

En `server/asesorias_backend/settings.py`:
- `DATABASES.PASSWORD` — contraseña PostgreSQL local
- `SOCIALACCOUNT_PROVIDERS.google.APP.client_id` — Google OAuth Client ID
- `SOCIALACCOUNT_PROVIDERS.google.APP.secret` — Google OAuth Client Secret
- `CLOUDINARY_STORAGE.CLOUD_NAME / API_KEY / API_SECRET` — Cloudinary

---

## Apps del backend

| App | Descripción |
|-----|-------------|
| `core` | AuditModel base (heredado por todos los modelos) |
| `products` | Category, Subcategoria, Product |
| `accounts` | UserProfile, login con Google |
| `orders` | Purchase (compras de usuarios) |

---

## API Endpoints

| Método | URL | Acceso |
|--------|-----|--------|
| GET | `/api/products/` | Público |
| GET | `/api/categories/` | Público |
| GET | `/api/subcategories/` | Público |
| GET | `/api/accounts/me/` | Autenticado |
| GET | `/api/orders/mis-productos/` | Autenticado |
| POST | `/api/auth/social/` | Google OAuth |


En admin de django:
Nombre de usuario:mcorteze
Dirección de correo electrónico: mcorteze23@gmail.com
Password: 0k4mysm0.#261