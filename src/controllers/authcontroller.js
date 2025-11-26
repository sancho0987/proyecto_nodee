import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

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
                sub: user.id,            // identificador del usuario
            },
            process.env.JWT_SECRET,      // clave del .env
            {
                expiresIn: "1h",         // exp: 1 hora
            }
        );

        // 4. Responder con el token
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
