import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el componente tasks por ID en la base de datos
    const tarea = await Tasks.findById(id);

    // Verificar si se encontró el componente
    if (!tarea) {
      return res.status(404).json({ message: 'Componente tasks no encontrado' });
    }

    // Devolver la información del componente tasks encontrado
    res.status(200).json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
