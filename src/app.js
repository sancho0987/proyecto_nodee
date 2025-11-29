import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authroutes.js";
import taskRoutes from "./routes/taskroutes.js";

const app = express();

/* GLOBAL JSON */
app.use(express.json());

/* CORS */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* RATE LIMIT */
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Demasiados intentos. Intenta más tarde." },
});

/* MONTAJE DE ROUTER */
app.use("/auth", authLimiter);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

/* SERVER */
app.listen(3000, () => console.log("Server running on port 3000"));

export default app;