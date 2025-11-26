import prisma from "../prisma.js";

// Obtener tareas del usuario autenticado
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id
      }
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Crear tarea asociada al usuario autenticado
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: req.user.id
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Actualizar solo si pertenece al usuario
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.updateMany({
      where: { id: Number(id), userId: req.user.id },
      data: req.body
    });

    if (task.count === 0) {
      return res.status(404).json({ message: "Task not found or not yours" });
    }

    res.status(200).json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Eliminar solo si pertenece al usuario
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.deleteMany({
      where: { id: Number(id), userId: req.user.id }
    });

    if (task.count === 0) {
      return res.status(404).json({ message: "Task not found or not yours" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
