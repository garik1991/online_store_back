const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  logging: false,
  host: DB_HOST,
});
