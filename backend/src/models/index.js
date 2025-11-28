const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const CategoriaFactory = require('./Categoria');
const ProductoFactory = require('./Producto');

const Categoria = CategoriaFactory(sequelize, DataTypes);
const Producto = ProductoFactory(sequelize, DataTypes);

// Asociaciones
Categoria.hasMany(Producto, {
  foreignKey: 'categoriaId',
  as: 'productos'
});

Producto.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria'
});

// Exportar todo
module.exports = {
  sequelize,
  Categoria,
  Producto
};
