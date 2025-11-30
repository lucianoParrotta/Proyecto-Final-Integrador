const MovimientoStock = require("../models/MovimientoStock");
const Producto = require("../models/Producto");
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

    // Verificar que el producto existe
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Crear el movimiento
    const movimiento = await MovimientoStock.create({
      productoId,
      tipo,
      cantidad,
      fecha: fecha || new Date(),
      descripcion,
      usuario: usuario || "Sistema",
    });

    // Actualizar stock del producto
    const cantidadNumerica = parseFloat(cantidad);
    if (tipo === "ENTRADA") {
      producto.stock += cantidadNumerica;
    } else if (tipo === "SALIDA") {
      // Validar que hay suficiente stock
      if (producto.stock < cantidadNumerica) {
        // Eliminar el movimiento creado
        await movimiento.destroy();
        return res.status(400).json({ error: "Stock insuficiente para esta salida" });
      }
      producto.stock -= cantidadNumerica;
    }

    await producto.save();

    res.status(201).json({
      movimiento,
      stockActual: producto.stock,
    });
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

    // Obtener el producto
    const producto = await Producto.findByPk(movimiento.productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Si cambia tipo o cantidad, necesitamos recalcular stock
    const tipoAnterior = movimiento.tipo;
    const cantidadAnterior = parseFloat(movimiento.cantidad);
    const cantidadNueva = cantidad ? parseFloat(cantidad) : cantidadAnterior;
    const tipoNuevo = tipo || tipoAnterior;

    if (tipoNuevo !== tipoAnterior || cantidadNueva !== cantidadAnterior) {
      // Revertir el impacto anterior
      if (tipoAnterior === "ENTRADA") {
        producto.stock -= cantidadAnterior;
      } else {
        producto.stock += cantidadAnterior;
      }

      // Aplicar nuevo impacto
      if (tipoNuevo === "ENTRADA") {
        producto.stock += cantidadNueva;
      } else {
        // Validar stock suficiente para salida
        if (producto.stock < cantidadNueva) {
          return res.status(400).json({ error: "Stock insuficiente para esta operación" });
        }
        producto.stock -= cantidadNueva;
      }

      await producto.save();
    }

    // Actualizar movimiento
    if (tipo) movimiento.tipo = tipo;
    if (cantidad) movimiento.cantidad = cantidad;
    if (fecha) movimiento.fecha = fecha;
    if (descripcion) movimiento.descripcion = descripcion;
    if (usuario) movimiento.usuario = usuario;

    await movimiento.save();

    res.json({
      movimiento,
      stockActual: producto.stock,
    });
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

    // Obtener el producto para revertir el cambio de stock
    const producto = await Producto.findByPk(movimiento.productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Revertir el impacto en stock
    const cantidadNumerica = parseFloat(movimiento.cantidad);
    if (movimiento.tipo === "ENTRADA") {
      producto.stock -= cantidadNumerica;
    } else if (movimiento.tipo === "SALIDA") {
      producto.stock += cantidadNumerica;
    }

    // Asegurar que el stock no sea negativo
    if (producto.stock < 0) {
      producto.stock = 0;
    }

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

    const where = { productoId };
    if (fechaInicio || fechaFin) {
      where.fecha = {};
      if (fechaInicio) where.fecha[Op.gte] = new Date(fechaInicio);
      if (fechaFin) where.fecha[Op.lte] = new Date(fechaFin);
    }

    const movimientos = await MovimientoStock.findAll({
      where,
      order: [["fecha", "DESC"]],
    });

    let totalSalidas = 0;
    movimientos.forEach((mov) => {
      if (mov.tipo === "SALIDA") {
        totalSalidas += parseFloat(mov.cantidad);
      }
    });

    res.json({
      productoId,
      totalSalidas,
      movimientos,
    });
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
