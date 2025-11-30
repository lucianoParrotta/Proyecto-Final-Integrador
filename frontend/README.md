# Frontend – Sistema de Gestión de Inventario (SGIG)

Este documento describe la estructura, instalación y funcionamiento del **frontend** del Proyecto Final Integrador.  
El frontend implementa la interfaz completa del sistema SGIG, incluyendo login, dashboard, productos, movimientos y módulos prototipo.

---

# Tecnologías principales

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **Context API para autenticación**
- **jspdf, jspdf-autotable, SheetJS (xlsx), FileSaver.js** para exportaciones

---

# Estructura del proyecto

```
frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── components/
│   │   ├── categorias/
│   │   ├── layouts/
│   ├── context/
│   ├── mocks/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

# Autenticación

El frontend utiliza:

### ✔️ **Context API (`AuthContext`)**
- Guarda el token JWT
- Guarda el usuario autenticado
- Protege rutas privadas
- Persiste sesión en `localStorage`

### ✔️ **PrivateRoute**
Protege todas las rutas salvo `/login`.

---

# Variables de entorno

Crear `/frontend/.env`:

```
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=mi_api_key_segura
```

---

# Módulos principales

## Login
- Validación contra backend  
- Guarda token y usuario  
- Redirección automática  

## Dashboard / Home
- Muestra métricas reales desde backend:
  - Productos totales  
  - Stock bajo  
  - Valorización de stock  
  - Categorías  
  - Proveedores  
- Barras, estados, tarjetas dinámicas

## Productos (mock)
- Listado con filtros  
- Vista responsiva  
- Exportación PDF + XLS  
- Modal de exportación  
- CRUD visual prototipo  

## Categorías (WIP)
- Página agregada en prototipo  
- Sidebar habilitado  
- Próxima integración con backend  

## Movimientos
- **Conectado a backend real**  
- Filtrado por:
  - tipo  
  - producto  
  - fechas  
  - búsqueda  
- Exportación CSV  
- Rotación de productos  
- Modal crear/editar  
- Tabla responsiva

## Perfil del usuario
- Cambiar contraseña  
- Ver información de sesión  
- Modal para cerrar sesión  

---

# ▶ Instalación y ejecución

## 1. Instalar dependencias

```
cd frontend
npm install
```

## 2. Ejecutar el servidor de desarrollo

```
npm run dev
```

Acceder en:

👉 `http://localhost:5173`

---

# 🧪 Exportaciones disponibles

## PDF
- Usa `jspdf` + `jspdf-autotable`
- Exporta tabla completa de productos (mock)

## XLS
- Usa `xlsx` (SheetJS)
- Exporta tabla mock

---

# UI/UX implementado

- Diseño consistente con:
  - Dashboard
  - Productos
  - Movimientos
  - Provedores
  - Perfil
- Estilo minimalista, moderno (inspirado en Tailwind UI / ShadCN)
- Colores neutros + acentos azul/indigo
- Componentes reutilizables

---

# 📎 Contacto técnico (equipo)

- **Luciano Parrotta** – UI/UX + Productos + Integración  
- **Federico Ruppel** – Categorías  
- **Franco Muñoz** – Proveedores  
- **Camilo Dietrich** – Movimientos + Autenticación

---

Proyecto académico – Universidad / Uso educativo.

