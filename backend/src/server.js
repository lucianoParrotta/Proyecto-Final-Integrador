require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const app = require("./app");
const { sequelize } = require("./config/database");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // Probar conexión a la base
    await sequelize.authenticate();
    console.log("✅ Conexión a la BD OK");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error conectando a la BD:", err.message);
    process.exit(1);
  }
}

start();