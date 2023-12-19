import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  const { id } = req.params; // Suponiendo que el ID está en los parámetros de la solicitud
  const updatedData = req.body; // Suponiendo que los datos actualizados están en el cuerpo de la solicitud

  try {
    // Verificar si existe la tarea con el ID proporcionado
    const existingTask = await Tasks.findById(id);

    if (!existingTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Actualizar la tarea existente con los datos proporcionados
    await Tasks.findByIdAndUpdate(id, updatedData);

    // Obtener la tarea actualizada
    const updatedTask = await Tasks.findById(id);

    // Responder con la tarea actualizada
    res.status(200).json(updatedTask);
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
