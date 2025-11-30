// backend/src/controllers/productosController.js
const { Op } = require('sequelize');
const { Producto, Categoria } = require('../models');

// GET /productos
const getProductos = async (req, res, next) => {
  try {
    const {
      q,
      categoriaId,
      proveedorId,
      stockBajo,
      estado,
    } = req.query;

    const where = {};

    if (q) {
      where[Op.or] = [
        { nombre: { [Op.iLike]: `%${q}%` } },
        { codigo: { [Op.iLike]: `%${q}%` } },
      ];
    }

    if (categoriaId) {
      where.categoriaId = categoriaId;
    }

    if (proveedorId) {
      where.proveedorId = proveedorId;
    }

    if (estado) {
      where.estado = estado;
    }

    if (stockBajo === 'true') {
      where.stock = { [Op.lte]: Sequelize.col('stock_minimo') };
    }

    const productos = await Producto.findAll({
      where,
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nombre'],
        },
      ],
      order: [['nombre', 'ASC']],
    });

    res.json(productos);
  } catch (error) {
    next(error);
  }
};

// GET /productos/:id
const getProductoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nombre'],
        },
      ],
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// POST /productos
const createProducto = async (req, res, next) => {
  try {
    const {
      codigo,
      nombre,
      descripcion,
      precio,
      stock,
      stockMinimo,
      estado,
      categoriaId,
      proveedorId,
    } = req.body;

    if (!codigo || !nombre || !precio || !categoriaId) {
      return res.status(400).json({
        message: 'codigo, nombre, precio y categoriaId son obligatorios',
      });
    }

    const existente = await Producto.findOne({ where: { codigo } });
    if (existente) {
      return res.status(409).json({ message: 'Ya existe un producto con ese código' });
    }

    const nuevo = await Producto.create({
      codigo,
      nombre,
      descripcion,
      precio,
      stock: stock ?? 0,
      stockMinimo: stockMinimo ?? 0,
      estado: estado ?? 'Activo',
      categoriaId,
      proveedorId: proveedorId ?? null,
    });

    res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
};

// PUT /productos/:id
const updateProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const {
      codigo,
      nombre,
      descripcion,
      precio,
      stock,
      stockMinimo,
      estado,
      categoriaId,
      proveedorId,
    } = req.body;

    // si cambia el código, validamos unicidad
    if (codigo && codigo !== producto.codigo) {
      const existeCodigo = await Producto.findOne({ where: { codigo } });
      if (existeCodigo) {
        return res.status(409).json({ message: 'Ya existe un producto con ese código' });
      }
    }

    await producto.update({
      codigo: codigo ?? producto.codigo,
      nombre: nombre ?? producto.nombre,
      descripcion: descripcion ?? producto.descripcion,
      precio: precio ?? producto.precio,
      stock: stock ?? producto.stock,
      stockMinimo: stockMinimo ?? producto.stockMinimo,
      estado: estado ?? producto.estado,
      categoriaId: categoriaId ?? producto.categoriaId,
      proveedorId: proveedorId ?? producto.proveedorId,
    });

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

// DELETE /productos/:id  (borrado lógico)
const deleteProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await producto.update({ estado: 'Inactivo' });

    res.json({ message: 'Producto desactivado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};