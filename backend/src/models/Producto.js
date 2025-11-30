// backend/src/models/Producto.js
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    'Producto',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      stockMinimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'stock_minimo',
      },
      estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        allowNull: false,
        defaultValue: 'Activo',
      },
      categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'categoria_id',
      },
      proveedorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'proveedor_id',
      },
    },
    {
      // 👇 CLAVE: que coincida con lo que Sequelize está esperando para la FK
      tableName: 'Productos', // con P mayúscula
      timestamps: true,
    }
  );

  return Producto;
};