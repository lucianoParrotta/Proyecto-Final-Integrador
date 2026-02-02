// backend/src/controllers/movimientos.controller.js
const { MovimientoStock, Producto } = require("../models");
const { Op } = require("sequelize");

// Obtener todos los movimientos
const obtenerMovimientos = async (req, res) => {
  try {
    const {
      tipo,
      productoId,
      fechaInicio,
      fechaFin,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const offset = (pageNum - 1) * limitNum;

    const where = {};

    if (tipo) where.tipo = tipo;
    if (productoId) where.productoId = productoId;

    if (fechaInicio || fechaFin) {
      where.fecha = {};
      if (fechaInicio) where.fecha[Op.gte] = new Date(fechaInicio);
      if (fechaFin) where.fecha[Op.lte] = new Date(fechaFin);
    }

    const { count, rows } = await MovimientoStock.findAndCountAll({
      where,
      limit: limitNum,
      offset,
      order: [["fecha", "DESC"]],
    });

    res.json({
      total: count,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(count / limitNum),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un movimiento por ID
const obtenerMovimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const movimiento = await MovimientoStock.findByPk(id);
    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo movimiento
const crearMovimiento = async (req, res) => {
  try {
    const { productoId, tipo, cantidad, fecha, descripcion } = req.body;

    if (!productoId || !tipo || !cantidad) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    if (!["ENTRADA", "SALIDA"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // USUARIO TOMADO DEL TOKEN
    const usuario = req.user?.username || "Sistema";

    const movimiento = await MovimientoStock.create({
      productoId,
      tipo,
      cantidad,
      fecha: fecha || new Date(),
      descripcion,
      usuario,
    });

    const qty = parseFloat(cantidad);

    if (tipo === "ENTRADA") {
      producto.stock += qty;
    } else {
      if (producto.stock < qty) {
        await movimiento.destroy();
        return res.status(400).json({ error: "Stock insuficiente" });
      }
      producto.stock -= qty;
    }

    await producto.save();

    return res.status(201).json({
      movimiento,
      stockActual: producto.stock,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Actualizar un movimiento
const actualizarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, cantidad, fecha, descripcion } = req.body;

    const movimiento = await MovimientoStock.findByPk(id);
    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    const producto = await Producto.findByPk(movimiento.productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const tipoAnterior = movimiento.tipo;
    const cantidadAnterior = parseFloat(movimiento.cantidad);
    const cantidadNueva = cantidad ? parseFloat(cantidad) : cantidadAnterior;
    const tipoNuevo = tipo || tipoAnterior;

    if (tipoNuevo !== tipoAnterior || cantidadNueva !== cantidadAnterior) {
      // revertir impacto anterior
      if (tipoAnterior === "ENTRADA") producto.stock -= cantidadAnterior;
      else producto.stock += cantidadAnterior;

      // aplicar nuevo impacto
      if (tipoNuevo === "ENTRADA") producto.stock += cantidadNueva;
      else {
        if (producto.stock < cantidadNueva) {
          return res.status(400).json({ error: "Stock insuficiente" });
        }
        producto.stock -= cantidadNueva;
      }

      await producto.save();
    }

    // actualizar solo campos permitidos
    if (tipo) movimiento.tipo = tipo;
    if (cantidad) movimiento.cantidad = cantidad;
    if (fecha) movimiento.fecha = fecha;
    if (descripcion !== undefined) movimiento.descripcion = descripcion;

    // NO se toca movimiento.usuario
    await movimiento.save();

    return res.json({
      movimiento,
      stockActual: producto.stock,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Eliminar un movimiento
const eliminarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const movimiento = await MovimientoStock.findByPk(id);
    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    const producto = await Producto.findByPk(movimiento.productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const cantidadNumerica = parseFloat(movimiento.cantidad);

    // Revertir impacto
    if (movimiento.tipo === "ENTRADA") {
      producto.stock -= cantidadNumerica;
    } else {
      producto.stock += cantidadNumerica;
    }

    if (producto.stock < 0) producto.stock = 0;

    await producto.save();
    await movimiento.destroy();

    res.json({
      message: "Movimiento eliminado correctamente",
      stockActual: producto.stock,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reporte por periodo
const movimientosPorPeriodo = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: "Se requieren fechaInicio y fechaFin" });
    }

    const movimientos = await MovimientoStock.findAll({
      where: {
        fecha: {
          [Op.gte]: new Date(fechaInicio),
          [Op.lte]: new Date(fechaFin),
        },
      },
      order: [["fecha", "DESC"]],
    });

    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reporte rotación por producto
const rotacionPorProducto = async (req, res) => {
  try {
    const { productoId, fechaInicio, fechaFin } = req.query;

    const where = {};
    if (productoId) where.productoId = productoId;

    if (fechaInicio || fechaFin) {
      where.fecha = {};
      if (fechaInicio) where.fecha[Op.gte] = new Date(fechaInicio);
      if (fechaFin) where.fecha[Op.lte] = new Date(fechaFin);
    }

    const movimientos = await MovimientoStock.findAll({
      where,
      order: [["fecha", "DESC"]],
    });

    const rotacionMap = new Map();

    movimientos.forEach((mov) => {
      const pId = mov.productoId;
      if (!rotacionMap.has(pId)) {
        rotacionMap.set(pId, { productoId: pId, totalEntradas: 0, totalSalidas: 0 });
      }

      const data = rotacionMap.get(pId);
      const cant = parseFloat(mov.cantidad);

      if (mov.tipo === "ENTRADA") data.totalEntradas += cant;
      else data.totalSalidas += cant;
    });

    const resultado = Array.from(rotacionMap.values()).map((item) => ({
      productoId: item.productoId,
      totalEntradas: parseFloat(item.totalEntradas.toFixed(2)),
      totalSalidas: parseFloat(item.totalSalidas.toFixed(2)),
      rotacion:
        item.totalEntradas > 0
          ? parseFloat((item.totalSalidas / item.totalEntradas).toFixed(2))
          : 0,
    }));

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento,
  actualizarMovimiento,
  eliminarMovimiento,
  movimientosPorPeriodo,
  rotacionPorProducto,
};