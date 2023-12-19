import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { done } = req.body; 

    if (!isValidTaskId(taskId)) {
      return res.status(400).json({
        error: 'Task ID inválido',
      });
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { done }, 
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        error: 'Tarea no encontrada',
      });
    }

    res.json(updatedTask);
  } catch (err) {
    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
};

const isValidTaskId = (taskId) => {
  return typeof taskId === 'string' && taskId.length === 24;
};
