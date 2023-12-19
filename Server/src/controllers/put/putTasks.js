import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    const { done } = req.body;
    const id = req.params.id;

    // Verificar si el ID es válido (opcional)
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    // Actualizar la tarea en la base de datos
    const updatedTask = await Tasks.findByIdAndUpdate(
      id,
      { done },
      { new: true } // Devuelve el documento modificado
    );

    // Verificar si la tarea existe
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
