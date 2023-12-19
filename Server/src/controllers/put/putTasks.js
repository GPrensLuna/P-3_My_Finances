import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  const { id } = req.params;

  try {
    // Capturar la información antes de la actualización
    const tareaAntes = await Tasks.findById(id);

    // Verificar si se encontró el componente
    if (!tareaAntes) {
      return res.status(404).json({ message: 'Componente tasks no encontrado' });
    }

    // Realizar la actualización en la base de datos
    const tareaActualizada = await Tasks.findByIdAndUpdate(
      id,
      { /* Aquí van los datos actualizados que recibiste en la solicitud */ },
      { new: true } // Esto devuelve el documento actualizado en lugar del antiguo
    );

    // Devolver la información del componente actualizado
    res.status(200).json({ tareaAntes, tareaDespues: tareaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
