// backend/src/routes/productos.js
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const productosController = require('../controllers/productosController');

// 🔐 Todas las rutas de productos requieren estar logueado
router.use(auth);

// Listado + filtros
router.get('/', productosController.getProductos);

// Detalle
router.get('/:id', productosController.getProductoById);

// Crear
router.post('/', productosController.createProducto);

// Actualizar
router.put('/:id', productosController.updateProducto);

// Borrado lógico (desactivar)
router.delete('/:id', productosController.deleteProducto);

module.exports = router;