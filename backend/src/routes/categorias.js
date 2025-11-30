const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoria.controller');
const verifyToken = require("../middlewares/auth");


router.use(verifyToken);

router.get('/', controller.list);
router.get('/productos/count', controller.productosCount);
router.get('/stock-bajo', controller.stockBajo);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
