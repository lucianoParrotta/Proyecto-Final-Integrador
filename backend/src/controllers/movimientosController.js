const MovimientoStock = require("../models/MovimientoStock");
const { Op } = require("sequelize");

// Obtener todos los movimientos
const obtenerMovimientos = async (req, res) => {
  try {
    const { tipo, productoId, fechaInicio, fechaFin, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

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
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["fecha", "DESC"]],
    });

    res.json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(count / limit),
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
    const { productoId, tipo, cantidad, fecha, descripcion, usuario } = req.body;

    if (!productoId || !tipo || !cantidad) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    if (!["ENTRADA", "SALIDA"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo debe ser ENTRADA o SALIDA" });
    }

    const movimiento = await MovimientoStock.create({
      productoId,
      tipo,
      cantidad,
      fecha: fecha || new Date(),
      descripcion,
      usuario: usuario || "Sistema",
    });

    res.status(201).json(movimiento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un movimiento
const actualizarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, cantidad, fecha, descripcion, usuario } = req.body;

    const movimiento = await MovimientoStock.findByPk(id);

    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    if (tipo) {
      if (!["ENTRADA", "SALIDA"].includes(tipo)) {
        return res.status(400).json({ error: "Tipo debe ser ENTRADA o SALIDA" });
      }
      movimiento.tipo = tipo;
    }

    if (cantidad) movimiento.cantidad = cantidad;
    if (fecha) movimiento.fecha = fecha;
    if (descripcion) movimiento.descripcion = descripcion;
    if (usuario) movimiento.usuario = usuario;

    await movimiento.save();

    res.json(movimiento);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

    await movimiento.destroy();

    res.json({ message: "Movimiento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener movimientos por período (para reportes)
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

// Obtener rotación por producto
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

    // Agrupar por producto
    const rotacionMap = new Map();

    movimientos.forEach((mov) => {
      const pId = mov.productoId;
      if (!rotacionMap.has(pId)) {
        rotacionMap.set(pId, {
          productoId: pId,
          totalEntradas: 0,
          totalSalidas: 0,
          movimientos: [],
        });
      }

      const data = rotacionMap.get(pId);
      if (mov.tipo === "ENTRADA") {
        data.totalEntradas += parseFloat(mov.cantidad);
      } else {
        data.totalSalidas += parseFloat(mov.cantidad);
      }
      data.movimientos.push(mov);
    });

    // Calcular rotación para cada producto
    const resultado = Array.from(rotacionMap.values()).map((item) => ({
      productoId: item.productoId,
      totalEntradas: parseFloat(item.totalEntradas.toFixed(2)),
      totalSalidas: parseFloat(item.totalSalidas.toFixed(2)),
      rotacion: item.totalEntradas > 0 
        ? parseFloat((item.totalSalidas / item.totalEntradas).toFixed(2))
        : 0,
      movimientos: item.movimientos,
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
