import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Cargamos variables de entorno
dotenv.config();

// Inicializamos express
const app = express();

// Inicializamos Prisma
const prisma = new PrismaClient();

// Puerto donde correrá el servidor
const PORT = process.env.PORT || 3000;

/* -----------------------------------------
   MIDDLEWARES
------------------------------------------ */

// Middleware para poder leer JSON del body
app.use(express.json());

/* -----------------------------------------
   RUTAS
------------------------------------------ */

// Ruta base para probar que el servidor funciona
app.get("/", (req, res) => {
  res.send("API running");
});

// Importamos las rutas de tareas
import taskRoutes from "./routes/taskroutes.js";

// Conectamos las rutas bajo el prefijo /tasks
app.use("/tasks", taskRoutes);

// Importamos rutas de autenticación
import authRoutes from "./routes/authroutes.js";

// Usamos las rutas bajo /auth
app.use("/auth", authRoutes);


// Ejemplo usando Prisma
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/* -----------------------------------------
   INICIAR SERVIDOR
------------------------------------------ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ================================
// Commit 8 – CORS y Rate Limiting
// ================================

import cors from "cors";
import rateLimit from "express-rate-limit";

// --- Configuración de CORS ---
// Permite el acceso desde el frontend. Si aun no existe,
// se deja en "*" pero luego se restringe.

app.use(cors({
  origin: "*", // ← cámbialo al dominio de tu frontend cuando lo tengas
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// --- Rate Limiting para evitar ataques de fuerza bruta en /auth ---
// Limita intentos de login para evitar adivinar contraseñas.

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 5, // Máximo 5 intentos de login por minuto
  message: {
    error: "Too many login attempts, try again later."
  }
});

// Aplica rate-limit SOLO a las rutas de autenticación
app.use("/auth", authLimiter);

// --- Rate Limiting opcional para /tasks ---
// Para evitar spam o automatizar miles de peticiones seguidas

const tasksLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests to tasks endpoint."
  }
});

// Se aplica a todas las rutas /tasks
app.use("/tasks", tasksLimiter);

// ================================
// FIN Commit 8
// ================================