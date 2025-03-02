import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("VJTI Administration Backend is running! 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

export default app;
