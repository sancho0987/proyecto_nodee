import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        // 2. Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Crear el usuario
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.json({
            message: "Usuario registrado correctamente",
            user: {
                id: newUser.id,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};


// ------------------------------------
// LOGIN
// ------------------------------------
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar usuario por su email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        // 2. Comparar contraseña con bcrypt
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        // 3. Generar JWT
        const token = jwt.sign(
            {
                sub: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};