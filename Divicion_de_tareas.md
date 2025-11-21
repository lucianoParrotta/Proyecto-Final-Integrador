# División de Tareas del Proyecto Final Integrador  
*(Versión para organización del equipo, sin estructura Jira)*

## 👥 Integrantes
- Luciano Parrotta  
- Federico Ruppel  
- Franco Muñoz  
- Camilo Dietrich  

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
- Consultas por pantalla (si aplica)  
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
- Reportes PDF/XLS  
  - Listado completo  
  - Filtrado  
  - **Valorización del stock (entregable de Luciano)**  

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
- Reportes PDF/XLS  
  - Listado completo  
  - Filtrado  
  - **Stock bajo por categoría (entregable de Federico)**  

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
- Reportes PDF/XLS  
  - Listado completo  
  - Filtrado  
  - **Valorización del stock por proveedor (entregable de Franco)**  

---

## 🟥 Camilo Dietrich — Movimientos de Stock
### Backend
- Modelo MovimientoStock  
- CRUD completo  
- Impacto en stock del producto  
- Eliminación recalcula stock

### Frontend
- Pantalla de movimientos  
- Tabla con filtros avanzados (fecha, tipo, producto)  
- ABM  
- Reportes PDF/XLS  
  - Movimientos por período  
  - **Rotación por producto (entregable de Camilo)**  

---

# 3. División Global del Sistema (Reparto Equilibrado)

## Luciano (Frontend)
- Navbar + Sidebar  
- Layout general  
- Home del sistema  
- Estadísticas principales  
- Diseño general UI  
- README técnico del FRONTEND  

## Federico (Backend + Docs)
- README técnico principal global  
- Diagrama ER  
- Colección completa de Postman  
- Middleware API_KEY global  

## Franco (Backend + Deploy)
- Deploy del backend en Render  
- Variables de entorno en producción  
- Estandarización de controladores backend  
- Ayuda en organización del backend  

## Camilo (Frontend + Deploy)
- Deploy del frontend en Vercel  
- Perfil del usuario  
- Login + persistencia  
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
- SUBTASK 1.1.3: Crear estructura base (pages, components, layouts)
- SUBTASK 1.1.4: Configurar React Router
- SUBTASK 1.1.5: Configurar variables de entorno (.env)

---

## TASK 1.2 — Layout general del sistema (Responsable: Luciano)
- SUBTASK 1.2.1: Navbar
- SUBTASK 1.2.2: Sidebar
- SUBTASK 1.2.3: AppLayout (estructura de página)
- SUBTASK 1.2.4: Footer
- SUBTASK 1.2.5: Responsive general

---

## TASK 1.3 — Home + estadísticas principales (Responsable: Luciano)
- SUBTASK 1.3.1: UI del dashboard
- SUBTASK 1.3.2: Crear endpoints de estadísticas (backend)
- SUBTASK 1.3.3: Integración de estadísticas en frontend
- SUBTASK 1.3.4: Cards, gráficos y métricas
- SUBTASK 1.3.5: Alertas de stock bajo

---

## TASK 1.4 — Autenticación y Perfil (Responsable: Camilo)
- SUBTASK 1.4.1: Login
- SUBTASK 1.4.2: Recuperación de contraseña (vista)
- SUBTASK 1.4.3: Persistencia de sesión
- SUBTASK 1.4.4: Página perfil del usuario
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

# 🧱 EPIC 3 — Módulos del Sistema (Entregables por Integrante)

---

## 🟦 EPIC 3.1 — Productos (Responsable: Luciano)
### Backend
- SUBTASK: Definir modelo Producto
- SUBTASK: Relaciones (categoría, proveedor)
- SUBTASK: CRUD completo
- SUBTASK: Consultas especiales

### Frontend
- SUBTASK: Pantalla `/productos`
- SUBTASK: Tabla + filtros + búsqueda
- SUBTASK: Vista individual
- SUBTASK: ABM completo
- SUBTASK: Exportación PDF/XLS
- SUBTASK: Reporte valorización del stock

---

## 🟩 EPIC 3.2 — Categorías (Responsable: Federico)
### Backend
- SUBTASK: Modelo Categoría
- SUBTASK: CRUD completo

### Frontend
- SUBTASK: Pantalla `/categorias`
- SUBTASK: Tabla + paginado
- SUBTASK: ABM completo  
- SUBTASK: Reporte stock bajo por categoría

---

## 🟨 EPIC 3.3 — Proveedores (Responsable: Franco)
### Backend
- SUBTASK: Modelo Proveedor
- SUBTASK: CRUD completo

### Frontend
- SUBTASK: Pantalla `/proveedores`
- SUBTASK: Tabla + paginado
- SUBTASK: ABM completo
- SUBTASK: Reporte valorización de stock por proveedor

---

## 🟥 EPIC 3.4 — Movimientos de Stock (Responsable: Camilo)
### Backend
- SUBTASK: Modelo MovimientoStock
- SUBTASK: CRUD completo
- SUBTASK: Impacto en stock
- SUBTASK: Recalcular stock al eliminar

### Frontend
- SUBTASK: Pantalla `/movimientos`
- SUBTASK: Tabla con filtros avanzados
- SUBTASK: ABM completo
- SUBTASK: Reporte de rotación por período

---

# 🧱 EPIC 4 — Entregables Finales

## TASK 4.1 — README técnico global (Responsable: Federico)
## TASK 4.2 — Colección Postman completa (Responsable: Federico)
## TASK 4.3 — Deploy del Frontend (Responsable: Camilo)
## TASK 4.4 — Diagramas, ER y documentación (Responsable: Federico)

---