// backend/src/routes/movimientos.js
const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth");

const {
  obtenerMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento,
  actualizarMovimiento,
  eliminarMovimiento,
  movimientosPorPeriodo,
  rotacionPorProducto,
} = require("../controllers/movimientosController");

// JWT obligatorio para todo movimientos
router.use(verifyToken);

// Rutas especiales PRIMERO (antes de "/:id")
router.get("/reportes/periodo", movimientosPorPeriodo);
router.get("/reportes/rotacion", rotacionPorProducto);

// CRUD
router.get("/", obtenerMovimientos);
router.post("/", crearMovimiento);
router.get("/:id", obtenerMovimientoPorId);
router.put("/:id", actualizarMovimiento);
router.delete("/:id", eliminarMovimiento);

module.exports = router;