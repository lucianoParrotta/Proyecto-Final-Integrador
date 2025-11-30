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

    // VALORIZACIÓN DEL STOCK - simplificado
    let valorizacionStock = 0;
    try {
      const valorizacion = await db.Producto.findAll({
        attributes: [
          [db.Sequelize.fn("SUM",
            db.Sequelize.literal("CAST(precio AS DECIMAL) * stock")
          ), "total"]
        ],
        raw: true
      });
      valorizacionStock = valorizacion[0]?.total || 0;
    } catch (err) {
      console.warn("Advertencia calculando valorización:", err.message);
      valorizacionStock = 0;
    }

    // CANTIDAD POR CATEGORÍA
    let cantidadPorCategoria = [];
    try {
      cantidadPorCategoria = await db.Categoria.findAll({
        attributes: [
          "nombre",
          [db.Sequelize.fn("COUNT", db.Sequelize.col("Productos.id")), "cantidad"]
        ],
        include: [{ 
          model: db.Producto, 
          attributes: [],
          required: false 
        }],
        group: ["Categoria.id"],
        subQuery: false,
        raw: true
      });
    } catch (err) {
      console.warn("Advertencia en categorías:", err.message);
      cantidadPorCategoria = [];
    }

    // CANTIDAD POR PROVEEDOR
    let cantidadPorProveedor = [];
    // (Proveedor no está implementado aún, así que retorna vacío)

    // ROTACIÓN 
    let rotacion = [];
    try {
      if (db.MovimientoStock) {
        rotacion = await db.MovimientoStock.findAll({
          attributes: [
            "productoId",
            [db.Sequelize.fn("SUM", db.Sequelize.col("cantidad")), "total"]
          ],
          where: { tipoMovimiento: "SALIDA" },
          group: ["productoId"],
          raw: true
        });
      }
    } catch (err) {
      console.warn("Advertencia en rotación:", err.message);
      rotacion = [];
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
    console.error("Error en /stats/dashboard:", error.message);
    res.status(500).json({ 
      error: "Error al obtener estadísticas",
      detail: error.message 
    });
  }
});

module.exports = router;
