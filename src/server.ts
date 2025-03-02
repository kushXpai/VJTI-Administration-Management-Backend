import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/database";
import app from "./app";

const PORT = process.env.PORT || 4444;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
