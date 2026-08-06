require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log("======================================");
      console.log("🚀 GymSaaS Backend Started Successfully");
      console.log(`🌍 Server : http://localhost:${PORT}`);
      console.log(`📅 Environment : ${process.env.NODE_ENV}`);
      console.log("======================================");
    });
  } catch (error) {
    console.error("❌ Server Startup Failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();