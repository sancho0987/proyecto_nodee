

import express from "express";
import authRoutes from "./routes/authroutes.js";

const app = express();
app.use(express.json());
app.use(authRoutes);

app.listen(3000, () => {
  console.log("servidor iniciando correctamente");
});