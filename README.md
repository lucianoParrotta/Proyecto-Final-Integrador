# 🗂️ Sistema de Gestión de Inventario (SGIG)
### Proyecto Final Integrador – Sistema Funcional Desplegado

Este repositorio contiene el desarrollo **full-stack completo y funcional** del **Sistema de Gestión Integral de Inventario (SGIG)**, realizado en el marco del **Proyecto Final Integrador**, cumpliendo **todos los requisitos funcionales y técnicos establecidos en la consigna oficial**.

---

## 👥 Integrantes del Equipo

- **Luciano Parrotta** — Módulo Productos · Dashboard · UI/UX general · conexion backend con frontend · deploy
- **Federico Ruppel** — Módulo Categorías · Seguridad global  
- **Franco Muñoz** — Módulo Proveedores  
- **Camilo Dietrich** — Movimientos de Stock · Autenticación · Perfil  

---

## 🚀 1. Entrega Final (estado actual)

La **entrega final** corresponde a un **sistema completamente funcional**, donde **todos los módulos consumen la API real** y operan sobre una base de datos PostgreSQL.

### ✔ Características principales de la entrega final

- Aplicación desplegada en producción (Frontend: Vercel · Backend: Render)
- Persistencia real de datos
- Autenticación y autorización completas
- Sin datos mockeados
- Actualización automática de stock
- Reportes y métricas reales
- Interfaz final consistente y navegable

### ✔ Funcionalidades implementadas (Entrega Final)
### Login seguro
-	API Key obligatoria
-	JWT con expiración
-	Middleware de protección de rutas
### Dashboard
-	Métricas en tiempo real desde backend
-	Productos totales
-	Stock bajo
-	Valorización de inventario
-	Distribuciones y rotación
-	Reportes
### Productos
-	CRUD completo
-	Filtros y búsqueda
-	Impacto directo en stock
-	Reportes
### Categorías
-	CRUD completo
-	Filtros y búsqueda
-	Relación con productos
-	Reportes
### Proveedores
-	CRUD completo
-	Filtros y búsqueda
-	Asociación con productos
-	Reportes
### Movimientos de Stock
-	Entradas y salidas
-	Validación de stock
-	Reversión al editar/eliminar
-	Filtros por tipo, producto y fechas
-	Reportes
-	Exportación CSV
### Perfil de Usuario
-	Datos de sesión
-	Cambio de contraseña
### UI/UX
-	Layout consistente
-	Sidebar y navegación global
-	Diseño responsivo

---

## 🚀 1.2. Alcance de la entrega (Entrega anterior - Prototipo)
El **prototipo implementaba** todas las funcionalidades exigidas por la consigna, incluyendo:

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

## 5. Ejecución en local (opcional)

El sistema se encuentra desplegado en producción, pero puede ejecutarse localmente:

### Backend
```bash
cd backend
npm install
npm run dev
```

Servidor:  
👉 http://localhost:3000/api

### Frontend
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

## 7. Frontend – Funcionalidades
- Autenticación mediante Context API  
- Rutas privadas  
- Dashboard  
- Gestión visual completa de módulos  
- Exportación PDF/XLS  
- UI/UX consistente  

---

## Notas finales
Este proyecto representa la entrega final del Proyecto Final Integrador, mostrando la evolución desde un prototipo funcional hacia un sistema de gestión completo, desplegado y operativo, respetando buenas prácticas de desarrollo full-stack y documentación técnica. 
