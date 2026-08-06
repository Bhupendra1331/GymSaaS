const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",

    logging: false,

    timezone: "+05:30",

    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * Test Database Connection
 */
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log("✅ MySQL Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDatabase,
};