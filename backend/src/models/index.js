const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const CategoriaFactory = require('./Categoria');
const ProductoFactory = require('./Producto');

const MovimientoStock = require('./MovimientoStock');

// Instanciar modelos
const Categoria = CategoriaFactory(sequelize, DataTypes);
const Producto = ProductoFactory(sequelize, DataTypes);

const Proveedor = require("./Proveedor");

//Asociaciones

// Categoria 1 - N Producto
Categoria.hasMany(Producto, {
  foreignKey: 'categoriaId',
  as: 'productos'
});

Producto.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria'
});

// Producto 1 - N MovimientoStock
Producto.hasMany(MovimientoStock, {
  foreignKey: 'productoId',
  as: 'movimientos',
});

MovimientoStock.belongsTo(Producto, {
  foreignKey: 'productoId',
  as: 'producto',
});



// Exportar todo
module.exports = {
  sequelize,
  Categoria,
  Producto,
  MovimientoStock,
  Proveedor,
};
