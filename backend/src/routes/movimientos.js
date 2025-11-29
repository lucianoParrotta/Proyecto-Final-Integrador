const express = require("express");
const {
  obtenerMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento,
  actualizarMovimiento,
  eliminarMovimiento,
  movimientosPorPeriodo,
  rotacionPorProducto,
} = require("../controllers/movimientosController");

const router = express.Router();

// Rutas CRUD
router.get("/", obtenerMovimientos);
router.get("/:id", obtenerMovimientoPorId);
router.post("/", crearMovimiento);
router.put("/:id", actualizarMovimiento);
router.delete("/:id", eliminarMovimiento);

// Rutas especiales
router.get("/reportes/periodo", movimientosPorPeriodo);
router.get("/reportes/rotacion", rotacionPorProducto);

module.exports = router;
