// CJS (sin "type": "module")
const express = require("express");
const cors = require("cors");

const apiKeyMiddleware = require("./middlewares/apiKey");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
const movimientosRoutes = require("./routes/movimientos");
const categoriasRoutes = require("./routes/categorias");
const productosRoutes = require("./routes/productos");
const proveedoresRoutes = require("./routes/proveedores.routes");

const app = express();

/* =========================
   CORS CONFIGURADO
========================= */

// Orígenes permitidos desde ENV (producción)
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Permite llamadas sin origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    // Permitir siempre localhost (desarrollo)
    if (
      origin.startsWith("http://localhost") ||
      origin.startsWith("http://127.0.0.1")
    ) {
      return callback(null, true);
    }

    // Producción: validar contra allowlist
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};

// IMPORTANTE: CORS primero
app.use(cors(corsOptions));

// Responder preflight requests ANTES del apiKey
app.options("*", cors(corsOptions));

/* =========================
   MIDDLEWARES GENERALES
========================= */

app.use(express.json());

/* =========================
   HEALTH CHECK (PÚBLICO)
   - No requiere API KEY
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* =========================
   API KEY (PROTEGE TODO LO DEMÁS)
========================= */

// API KEY obligatoria para todas las rutas /api
app.use(apiKeyMiddleware);

/* =========================
   RUTAS
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/movimientos", movimientosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/proveedores", proveedoresRoutes);

// Rutas adicionales (Al momento no hay)
// app.use("/api", require("./routes"));

/* =========================
   MANEJO DE ERRORES
========================= */

app.use(errorHandler);

module.exports = app;