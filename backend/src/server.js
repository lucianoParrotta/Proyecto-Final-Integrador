// server.js (o el entrypoint que ejecutás en producción)

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // carga .env local SOLO en dev
}

const app = require("./app");
const { sequelize } = require("./config/database");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la BD OK");

    // En dev: permite ajustes automáticos. En prod: NO alter.
    await sequelize.sync({ alter: process.env.NODE_ENV !== "production" });
    console.log("🔧 Tablas sincronizadas");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error conectando a la BD:", err.message);
    process.exit(1);
  }
}

start();