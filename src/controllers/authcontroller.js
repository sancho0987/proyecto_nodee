import prisma from "../prisma.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación de datos obligatorios
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
