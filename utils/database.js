const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(
  "expenseapp",
  `${username}`,
  `${password}`,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;