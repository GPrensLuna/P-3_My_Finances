import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    req.body = { ...req.body, done: Date.now() }; 

    const updatedTask = await Tasks.findByIdAndUpdate(taskId, { $set: req.body }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "¡La tarea ha sido actualizada exitosamente!" });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
