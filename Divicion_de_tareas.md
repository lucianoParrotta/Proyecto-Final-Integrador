# 📌 División de Tareas del Proyecto Final Integrador  
*(Versión actualizada con corrección de responsabilidades – equilibrada y lista para uso del equipo)*

---

# 👥 Integrantes
- **Luciano Parrotta**
- **Federico Ruppel**
- **Franco Muñoz**
- **Camilo Dietrich**

---

# 1. División de Módulos por Alumno (Consigna Oficial)

| Integrante | Módulo Asignado |
|------------|------------------|
| **Luciano Parrotta** | Productos |
| **Federico Ruppel** | Categorías |
| **Franco Muñoz** | Proveedores |
| **Camilo Dietrich** | Movimientos de Stock |

Cada alumno debe entregar su módulo con:
- Listado con búsqueda, filtros y paginado
- Visualización individual
- CRUD completo
- Consultas especiales
- Reportes PDF/XLS (completo + filtrado)

---

# 2. División Individual por Alumno

## 🟦 Luciano Parrotta — Módulo Productos
### Backend
- Modelo Producto en Sequelize
- Relación con Categoría y Proveedor
- Controlador y rutas CRUD
- Consultas especiales (productos con stock bajo, por categoría, por proveedor)

### Frontend
- Pantalla de productos
- Tabla con búsqueda + filtros + paginado
- Vista individual
- Formulario ABM
- Reportes PDF/XLS:
  - Listado completo
  - Filtrado
  - **Valorización del stock (entregable propio)**

---

## 🟩 Federico Ruppel — Módulo Categorías
### Backend
- Modelo Categoría
- CRUD completo
- Consultas especiales (cantidad de productos por categoría)

### Frontend
- Pantalla de categorías
- Tabla con búsqueda + paginado
- ABM completo
- Reportes PDF/XLS:
  - Listado completo
  - Filtrado
  - **Stock bajo por categoría (entregable)**

---

## 🟨 Franco Muñoz — Módulo Proveedores
### Backend
- Modelo Proveedor
- CRUD completo
- Consultas especiales (productos por proveedor)

### Frontend
- Pantalla de proveedores
- Tabla con búsqueda + paginado
- ABM completo
- Reportes PDF/XLS:
  - Listado completo
  - Filtrado
  - **Valorización del stock por proveedor (entregable)**

---

## 🟥 Camilo Dietrich — Movimientos de Stock
### Backend
- Modelo MovimientoStock
- CRUD completo
- Impacto en stock del producto
- Recalcular stock al eliminar movimiento

### Frontend
- Pantalla de movimientos
- Tabla con filtros avanzados (fecha, tipo, producto)
- ABM
- Reportes PDF/XLS:
  - Movimientos por período
  - **Rotación por producto (entregable)**

---

# 3. División Global del Sistema (Reparto Equilibrado)

## Luciano (Frontend)
- Navbar + Sidebar
- Layout general
- Home del sistema
- Estadísticas principales (solo consumo, no creación de endpoints)
- Diseño general UI
- README técnico del FRONTEND

## Federico (Backend + Docs)
- README técnico principal (global)
- Diagrama ER
- Colección Postman completa
- Middleware API_KEY global
- **Implementación de endpoints de estadísticas**

## Franco (Backend + Deploy)
- Deploy del backend en Render
- Variables de entorno
- Estructura y estandarización de controladores backend
- **Soporte en endpoints de estadísticas**
- Organización general backend

## Camilo (Frontend + Deploy)
- Login y persistencia
- Perfil de usuario
- Deploy del frontend en Vercel
- Integración de estadísticas con el home

---

# Proyecto Final Integrador — Estructura de Epics, Tasks y Subtasks (Jira)

---

# 🧱 EPIC 1 — Frontend General  
**Responsables:** Luciano & Camilo

---

## TASK 1.1 — Configuración inicial del Frontend (Vite + React + TS + Tailwind)
- SUBTASK 1.1.1: Configurar Vite
- SUBTASK 1.1.2: Configurar Tailwind
- SUBTASK 1.1.3: Estructura base (pages, components, layouts)
- SUBTASK 1.1.4: Configurar React Router
- SUBTASK 1.1.5: Configurar variables de entorno

---

## TASK 1.2 — Layout general del sistema (Responsable: Luciano)
- SUBTASK 1.2.1: Navbar
- SUBTASK 1.2.2: Sidebar
- SUBTASK 1.2.3: AppLayout
- SUBTASK 1.2.4: Footer
- SUBTASK 1.2.5: Responsive general

---

## TASK 1.3 — Home + estadísticas principales (Responsable: Luciano)
- SUBTASK 1.3.1: UI del dashboard
- ~~SUBTASK 1.3.2: Crear endpoints de estadísticas (backend)~~ ❌ Eliminada
- **NUEVA SUBTASK 1.3.2:** Documentar requerimientos de estadísticas
- SUBTASK 1.3.3: Integrar estadísticas del backend
- SUBTASK 1.3.4: Cards, gráficos y métricas
- SUBTASK 1.3.5: Alertas de stock bajo

---

## TASK 1.4 — Autenticación y Perfil (Responsable: Camilo)
- SUBTASK 1.4.1: Login
- SUBTASK 1.4.2: Recuperación de contraseña (vista)
- SUBTASK 1.4.3: Persistencia de sesión
- SUBTASK 1.4.4: Página de perfil
- SUBTASK 1.4.5: Logout

---

# 🧱 EPIC 2 — Backend General  
**Responsables:** Federico & Franco

---

## TASK 2.1 — Configuración inicial del Backend
- SUBTASK 2.1.1: Estructura base
- SUBTASK 2.1.2: Conexión PostgreSQL
- SUBTASK 2.1.3: Configuración de .env
- SUBTASK 2.1.4: Middlewares (CORS, JSON)
- SUBTASK 2.1.5: Ruta `/ping`

---

## TASK 2.2 — Seguridad global (Responsable: Federico)
- SUBTASK 2.2.1: Middleware API_KEY
- SUBTASK 2.2.2: Autenticación básica
- SUBTASK 2.2.3: Manejo de errores
- SUBTASK 2.2.4: Documentación en Postman
- SUBTASK 2.2.5: Protección de rutas

---

## TASK 2.3 — Despliegue Backend (Responsable: Franco)
- SUBTASK 2.3.1: Crear servicio en Render
- SUBTASK 2.3.2: Configurar variables de entorno
- SUBTASK 2.3.3: Scripts de producción
- SUBTASK 2.3.4: Test desde Postman
- SUBTASK 2.3.5: Documentar URL pública

---

## 🆕 TASK 2.4 — Endpoints de Estadísticas (Responsables: Federico & Franco)
- SUBTASK 2.4.1: Definir `/stats/dashboard`
- SUBTASK 2.4.2: Consultas SQL necesarias:
  - Total de productos
  - Productos con stock bajo
  - Valorización del stock
  - Cantidad por categoría
  - Cantidad por proveedor
  - Rotación (si aplica)
- SUBTASK 2.4.3: Implementación backend
- SUBTASK 2.4.4: Aplicar API_KEY
- SUBTASK 2.4.5: Documentación completa en Postman

---

# 🧱 EPIC 3 — Módulos del Sistema (Entregables por Integrante)

## 🟦 EPIC 3.1 — Productos (Responsable: Luciano)
### Backend
- Modelo Producto
- Relaciones
- CRUD completo
- Consultas especiales

### Frontend
- Pantalla `/productos`
- Tabla + filtros + búsqueda
- Vista individual
- ABM completo
- Exportación PDF/XLS
- **Reporte valorización del stock**

---

## 🟩 EPIC 3.2 — Categorías (Responsable: Federico)
### Backend
- Modelo Categoría
- CRUD completo

### Frontend
- Pantalla `/categorias`
- Tabla + paginado
- ABM
- **Reporte stock bajo por categoría**

---

## 🟨 EPIC 3.3 — Proveedores (Responsable: Franco)
### Backend
- Modelo Proveedor
- CRUD completo

### Frontend
- Pantalla `/proveedores`
- Tabla
- ABM
- **Reporte valorización de stock por proveedor**

---

## 🟥 EPIC 3.4 — Movimientos de Stock (Responsable: Camilo)
### Backend
- Modelo MovimientoStock
- CRUD completo
- Actualización de stock

### Frontend
- Pantalla `/movimientos`
- Tabla con filtros avanzados
- ABM
- **Reporte de rotación por período**

---

# 🧱 EPIC 4 — Entregables Finales

## TASK 4.1 — README técnico global (Federico)
## TASK 4.2 — Colección Postman completa (Federico)
## TASK 4.3 — Deploy del frontend (Camilo)
## TASK 4.4 — Diagramas, ER y documentación (Federico)