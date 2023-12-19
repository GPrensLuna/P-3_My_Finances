import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  const { done } = req.body;
  const id = req.params.id;

  try {
    const taskToUpdate = await Tasks.findByIdAndUpdate(id, { done });

    if (!taskToUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(taskToUpdate);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};
