# Backend – Sistema de Gestión de Inventario (SGIG)

Este backend forma parte del **Proyecto Final Integrador**, desarrollado con **Node.js + Express + Sequelize** y base de datos **PostgreSQL**.

Incluye autenticación, middlewares de seguridad, CRUD completos, estadísticas y reportes,
y constituye el **backend productivo del sistema**, operando sobre una base de datos PostgreSQL
con persistencia real de datos.

---

## Tecnologías utilizadas

- **Node.js + Express**
- **Sequelize ORM**
- **PostgreSQL**
- **JWT Authentication**
- **API Key Middleware**
- **Nodemon** para desarrollo
- **CORS, dotenv**

---

## Estructura del proyecto

```
backend/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productosController.js
│   │   ├── proveedores.controller.js
│   │   ├── movimientosController.js
│   │   └── categoriasController.js
│   │
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── apikey.js
│   │
│   ├── models/
│   ├── Producto.js
│   ├── Proveedor.js
│   ├── Categoria.js
│   ├── MovimientoStock.js
│   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── productos.js
│   │   ├── proveedores.routes.js
│   │   ├── categorias.js
│   │   └── movimientos.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── *.postman_collection.json
```

---

## 🔐 Autenticación y seguridad

> El sistema implementa un esquema de autenticación académico con usuario administrador único,
suficiente para demostrar control de acceso, JWT y protección de rutas según la consigna.

### 1) API Key  
Cada request debe incluir:

```
x-api-key: MI_API_KEY_SEGURA
```

### 2) JWT  
- Login genera un token válido por **2 horas**  
- Debe incluirse en:

```
Authorization: Bearer <token>
```

### 3) Middlewares incluidos
- `auth.js` → valida JWT  
- `apikey.js` → valida API Key  
- Logger opcional (aún no incluido)

---

## Variables de entorno `.env`

```
PORT=3000
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=inventario_db

API_KEY=mi_api_key_segura
JWT_SECRET=un_secreto_super_seguro
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
```

---

## Instalación y ejecución

### 1) Instalar dependencias

```
cd backend
npm install
```

### 2) Crear la base de datos

Desde psql o PGAdmin:

```
CREATE DATABASE inventario_db;
```

### 3) Ejecutar en modo desarrollo

```
npm run dev
```

---

## Endpoints principales

### 🔹 **Autenticación**
```
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/cambiar-password
```

### 🔹 **Productos**
```
GET    /api/productos
GET    /api/productos/:id
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
```

### 🔹 **Categorías**
```
GET    /api/categorias
POST   /api/categorias
PUT    /api/categorias/:id
DELETE /api/categorias/:id
```

### 🔹 **Proveedores**
```
GET    /api/proveedores
POST   /api/proveedores
PUT    /api/proveedores/:id
DELETE /api/proveedores/:id
```

### 🔹 **Movimientos**
```
GET    /api/movimientos
POST   /api/movimientos
PUT    /api/movimientos/:id
DELETE /api/movimientos/:id
GET    /api/movimientos/reportes/periodo
GET    /api/movimientos/reportes/rotacion
```

### 🔹 **Dashboard**
```
GET /api/stats/dashboard
```

Incluye:
- Total de productos
- Productos con stock bajo
- Valorización total de stock
- Distribución por categoría
- Distribución por proveedor
- Rotación de productos

---

## Postman Collections

Incluimos archivos para importación rápida:

- `Auth API.postman_collection.json`
- `Productos API.postman_collection.json`
- `Proveedores API.postman_collection.json`
- `Movimientos API.postman_collection.json`

> Se encuentran dentro de `/backend/`.

---

## 📦 Scripts disponibles

```
npm run dev      → desarrollo con nodemon
npm start        → producción
```

---

##  Contacto / Mantenimiento

Este módulo fue desarrollado por:

- **Luciano Parrotta**
- **Camilo Dietrich**
- **Franco Muñoz**
- **Federico Ruppel**

---

Proyecto académico — Entrega final del Proyecto Final Integrador.

