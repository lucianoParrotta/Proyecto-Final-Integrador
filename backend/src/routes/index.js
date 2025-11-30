const { Router } = require("express");

const router = Router();

const productosRoutes = require('./productos');

const proveedoresRoutes = require('./proveedores.routes')


// Ruta de salud/ping para probar backend + .env
router.get("/ping", (req, res) => {
  res.json({ ok: true, message: "pong" });
});

router.use("/auth", require("./auth"));

router.use("/categorias", require("./categorias"));

router.use('/productos', productosRoutes);

router.use('/proveedores', proveedoresRoutes)

module.exports = router;