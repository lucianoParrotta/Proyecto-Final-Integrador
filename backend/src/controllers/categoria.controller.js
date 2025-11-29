const { Categoria, Producto, sequelize } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async list(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const offset = (Math.max(1, parseInt(page)) - 1) * limit;

      const where = search
        ? { nombre: { [Op.iLike]: `%${search}%` } } 
        : {};

      const { rows, count } = await Categoria.findAndCountAll({
        where,
        order: [['nombre', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({ data: rows, total: count, page: parseInt(page), limit: parseInt(limit) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error listando categorías' });
    }
  },

  async get(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id, { include: [{ model: Producto, as: 'productos' }] });
      if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json(categoria);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo categoría' });
    }
  },

  async create(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
      const newCat = await Categoria.create({ nombre, descripcion });
      res.status(201).json(newCat);
    } catch (err) {
      console.error(err);
      if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'Nombre ya existe' });
      res.status(500).json({ error: 'Error creando categoría' });
    }
  },

  async update(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
      await categoria.update({ nombre, descripcion });
      res.json(categoria);
    } catch (err) {
      console.error(err);
      if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ error: 'Nombre ya existe' });
      res.status(500).json({ error: 'Error actualizando categoría' });
    }
  },

  async remove(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
      await categoria.destroy();
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error eliminando categoría' });
    }
  },

  // Cantidad de productos por categoria
  async productosCount(req, res) {
    try {
      const rows = await Categoria.findAll({
        include: [{ model: Producto, as: 'productos', attributes: [] }],
        attributes: [
          'id',
          'nombre',
          [sequelize.fn('COUNT', sequelize.col('productos.id')), 'cantidad']
        ],
        group: ['Categoria.id'],
        order: [['nombre', 'ASC']]
      });

      const result = rows.map(r => ({ id: r.id, categoria: r.nombre, cantidad: parseInt(r.get('cantidad'), 10) }));
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error calculando cantidad de productos' });
    }
  },

  // Stock bajo por categoría
  async stockBajo(req, res) {
    try {
      const umbral = parseInt(req.query.umbral || '10', 10);

      // Obtenemos categorias con productos cuyo stock < umbral
      const categorias = await Categoria.findAll({
        include: [{
          model: Producto, as: 'productos',
          where: { stock: { [Op.lt]: umbral } },
          attributes: ['id', 'nombre', 'stock'],
          required: true
        }],
        order: [['nombre', 'ASC']]
      });

      const result = categorias.map(c => ({
        id: c.id,
        categoria: c.nombre,
        productosBajoStock: c.productos.map(p => ({ id: p.id, nombre: p.nombre, stock: p.stock }))
      }));

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error obteniendo stock bajo' });
    }
  }
};