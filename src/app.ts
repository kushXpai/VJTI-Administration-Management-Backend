import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VJTI Administration Backend is running! 🚀");
});

app.use("/api/auth", authRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
