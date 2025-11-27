// CJS (sin "type": "module")
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const apiKeyMiddleware = require("./middlewares/apiKey");
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require("./routes/auth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(apiKeyMiddleware);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", routes);          

// Manejo de errores
app.use(errorHandler);

module.exports = app;