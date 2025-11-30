const Proveedor = require("../models/Proveedor");

// Obtener todos los proveedores
async function getAllProveedores(req, res, next) {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);
  } catch (err) {
    next(err);
  }
}

// Crear proveedor
async function createProveedor(req, res, next) {
  try {
    const nuevo = await Proveedor.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

// Obtener proveedor por ID
async function getProveedorById(req, res, next) {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json(proveedor);
  } catch (err) {
    next(err);
  }
}

// Actualizar proveedor
async function updateProveedor(req, res, next) {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    await proveedor.update(req.body);

    res.json(proveedor);
  } catch (err) {
    next(err);
  }
}

// Eliminar proveedor
async function deleteProveedor(req, res, next) {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    await proveedor.destroy();

    res.json({ message: "Proveedor eliminado" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllProveedores,
  createProveedor,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
};
