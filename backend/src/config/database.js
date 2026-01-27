const { Sequelize } = require("sequelize");

const {
  DATABASE_URL, // Render (inyectada automáticamente por la DB)
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

let sequelize;

if (DATABASE_URL) {
  // Producción (Render / Neon / Heroku-like)
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
  });
} else {
  // Desarrollo local
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST || "localhost",
    port: DB_PORT ? Number(DB_PORT) : 5432,
    dialect: "postgres",
    logging: false,
  });
}

module.exports = { sequelize };