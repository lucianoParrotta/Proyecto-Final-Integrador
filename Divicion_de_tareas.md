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

## Luciano (Frontend + Deploy)
- Navbar + Sidebar
- Layout general
- Home del sistema
- Estadísticas principales (solo consumo, no creación de endpoints)
- Diseño general UI
- README técnico del FRONTEND
- Deploy del frontend en Vercel
- Deploy del backend en Render
- Variables de entorno
- Conexion del backend con el frontend

## Federico (Backend + Docs)
- README técnico principal (global)
- Diagrama ER
- Colección Postman completa
- Middleware API_KEY global
- **Implementación de endpoints de estadísticas**

## Franco (Backend)
- Estructura y estandarización de controladores backend
- **Soporte en endpoints de estadísticas**
- Organización general backend

## Camilo (Frontend)
- Login y persistencia
- Perfil de usuario
- Integración de estadísticas con el home
---