import { Router } from "express";
import { register } from "../controllers/authcontroller.js";

const router = Router();

// Registro de usuario
router.post("/auth/register", register);

export default router;
