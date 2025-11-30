const express = require("express");
const router = express.Router();
const controller = require("../controllers/proveedores.controller");

// CRUD
router.get("/", controller.getAllProveedores);
router.post("/", controller.createProveedor);
router.get("/:id", controller.getProveedorById);
router.put("/:id", controller.updateProveedor);
router.delete("/:id", controller.deleteProveedor);

module.exports = router;
