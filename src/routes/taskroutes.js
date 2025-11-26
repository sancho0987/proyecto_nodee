import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/tasks.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Todas las rutas protegidas
router.get("/tasks", authMiddleware, getTasks);
router.post("/tasks", authMiddleware, createTask);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

export default router;
