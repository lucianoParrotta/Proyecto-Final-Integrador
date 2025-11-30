# 🗂️ Sistema de Gestión de Inventario (SGIG)
### Proyecto Final Integrador – Prototipo Funcional Completo

Este repositorio contiene el desarrollo full-stack del **Sistema de Gestión Integral de Inventario (SGIG)**, cumpliendo con **todos los requisitos funcionales establecidos en la consigna del Proyecto Final Integrador**.

---

## 👥 Integrantes del Equipo

- **Luciano Parrotta** — Módulo Productos · Dashboard · UI/UX general  
- **Federico Ruppel** — Módulo Categorías · Seguridad global  
- **Franco Muñoz** — Módulo Proveedores  
- **Camilo Dietrich** — Movimientos de Stock · Autenticación · Perfil  

---

## 🚀 1. Alcance de la entrega
Este prototipo implementa **todas las funcionalidades exigidas por la consigna**, incluyendo:

### ✔ Funcionalidades completadas
- **Login seguro** (API Key + JWT + middleware)
- **Dashboard general** con estadísticas en tiempo real
- **Módulo Productos**  
  - CRUD completo  
  - Filtros, búsqueda y paginado mock  
  - Vista individual  
  - Exportación **PDF/XLS** (prototipo con mock data)
- **Módulo Categorías** (CRUD completo)
- **Módulo Proveedores** (CRUD completo)
- **Movimientos de Stock**  
  - CRUD completo  
  - Filtros por tipo, fecha, producto  
  - Paginado  
  - Reporte rotación  
  - Reporte por período  
  - Exportación CSV  
- **Perfil de Usuario** + cambio de contraseña  
- **Sidebar y Layout general** consistente  
- **Seguridad aplicada en todas las rutas**

---

## 2. Tecnologías utilizadas

### 🔹 Backend
- Node.js + Express
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- API Key Security
- Middlewares personalizados
- Arquitectura MVC

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Context API (Auth)
- Exportación PDF (jsPDF + autoTable)
- Exportación XLSX (SheetJS)

---

## 3. Estructura del proyecto

```
Proyecto-Final-Integrador/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── mocks/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── router.tsx
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 4. Variables de entorno

### Backend (`backend/.env`)
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

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=mi_api_key_segura
```

---

## 5. Instalación y ejecución

### Backend
```bash
cd backend
npm install
```

Crear base de datos:
```sql
CREATE DATABASE inventario_db;
```

Iniciar servidor:
```bash
npm run dev
```

Servidor:  
👉 http://localhost:3000/api

---

### 🎨 Frontend
```bash
cd frontend
npm install
npm run dev
```

Disponible en:  
👉 http://localhost:5173

---

## 6. Autenticación

### Login
```
POST /auth/login
```

Body:
```json
{ "user": "admin", "password": "admin123" }
```

Headers:
```
x-api-key: <clave>
Authorization: Bearer <token>
```

---

## 7. Endpoints principales

### Auth
- POST /auth/login  
- POST /auth/cambiar-password  
- GET /auth/me  

### Productos
- CRUD completo  
- Exportación mock PDF/XLS  

### Categorías
- CRUD completo
- Exportación mock PDF/XLS  

### Proveedores
- CRUD completo

### Movimientos
- CRUD, filtros, reportes y exportación  

### Stats
- GET /stats/dashboard  

---

## 8. Frontend – Funcionalidades
- Autenticación mediante Context API  
- Rutas privadas  
- Dashboard  
- Gestión visual completa de módulos  
- Exportación PDF/XLS  
- UI/UX consistente  

---

## 9. Estado del proyecto
Este prototipo cumple **el 100% de las funcionalidades requeridas** para esta entrega.

✔ CRUD  
✔ Reportes  
✔ Seguridad  
✔ Dashboard  
✔ UI/UX  
✔ Exportaciones  
✔ Navegación  
✔ Filtros  

---

## Notas finales
Proyecto desarrollado **version prototipo** para el *Proyecto Final Integrador*.  
