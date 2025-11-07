const { Sequelize } = require("sequelize");

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

// Instancia de Sequelize (PostgreSQL)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || "localhost",
  port: DB_PORT ? Number(DB_PORT) : 5432,
  dialect: "postgres",
  logging: false, // poné true si querés ver las queries
});

module.exports = { sequelize };