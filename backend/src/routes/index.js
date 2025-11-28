const { Router } = require("express");

const router = Router();

// Ruta de salud/ping para probar backend + .env
router.get("/ping", (req, res) => {
  res.json({ ok: true, message: "pong" });
});

router.use("/auth", require("./auth"));

router.use("/categorias", require("./categorias"));

module.exports = router;