// CJS (sin "type": "module")
const express = require("express");
const cors = require("cors");

const apiKeyMiddleware = require("./middlewares/apiKey");
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
const movimientosRoutes = require("./routes/movimientos");
const categoriasRoutes = require("./routes/categorias");
const productosRoutes = require("./routes/productos");
const proveedoresRoutes = require("./routes/proveedores.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(apiKeyMiddleware);

// Rutas
app.use("/api/auth", authRoutes);

app.use("/api/stats", statsRoutes);
app.use("/api/movimientos", movimientosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/proveedores", proveedoresRoutes);

// Manejo de errores
app.use(errorHandler);

module.exports = app;