// CJS (sin "type": "module")
const express = require("express");
const cors = require("cors");

const apiKeyMiddleware = require("./middlewares/apiKey");
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
const categoriasRoutes = require("./routes/categorias");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(apiKeyMiddleware);

// Rutas
app.use("/api/auth", authRoutes);

app.use("/api/stats", statsRoutes);
app.use("/api/categorias", apiKeyMiddleware ,categoriasRoutes);

// Manejo de errores
app.use(errorHandler);

module.exports = app;