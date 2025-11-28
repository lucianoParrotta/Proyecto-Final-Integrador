const express = require("express");
const router = express.Router();
const apiKeyMiddleware = require("../middlewares/apiKey");
const db = require("../models"); 

// GET /api/stats/dashboard
router.get("/dashboard", apiKeyMiddleware, async (req, res) => {
  try {
    // TOTAL DE PRODUCTOS
    const totalProductos = await db.Producto.count();

    // PRODUCTOS CON STOCK BAJO
    const productosStockBajo = await db.Producto.count({
      where: { stock: { [db.Sequelize.Op.lt]: 5 } }
    });

    // VALORIZACIÓN DEL STOCK
    const valorizacion = await db.Producto.findAll({
      attributes: [
        [db.Sequelize.fn("SUM",
          db.Sequelize.literal("precio * stock")
        ), "valorizacionStock"]
      ]
    });

    const valorizacionStock = valorizacion[0].dataValues.valorizacionStock;

    // CANTIDAD POR CATEGORÍA
    const cantidadPorCategoria = await db.Categoria.findAll({
      attributes: [
        "nombre",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("Productos.id")), "cantidad"]
      ],
      include: [{ model: db.Producto, attributes: [] }],
      group: ["Categoria.id"]
    });

    // CANTIDAD POR PROVEEDOR (si tenés modelo Proveedor)
    let cantidadPorProveedor = [];
    if (db.Proveedor) {
      cantidadPorProveedor = await db.Proveedor.findAll({
        attributes: [
          "nombre",
          [db.Sequelize.fn("COUNT", db.Sequelize.col("Productos.id")), "cantidad"]
        ],
        include: [{ model: db.Producto, attributes: [] }],
        group: ["Proveedor.id"]
      });
    }

    // ROTACIÓN 
    let rotacion = [];
    if (db.Movimiento) {
      rotacion = await db.Movimiento.findAll({
        attributes: [
          "productoId",
          [db.Sequelize.fn("SUM",
            db.Sequelize.literal("CASE WHEN tipoMovimiento = 'salida' THEN cantidad ELSE 0 END")
          ), "rotacion"]
        ],
        group: ["productoId"]
      });
    }

    res.json({
      totalProductos,
      productosStockBajo,
      valorizacionStock,
      cantidadPorCategoria,
      cantidadPorProveedor,
      rotacion
    });

  } catch (error) {
    console.error("Error en /stats/dashboard:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
});

module.exports = router;
