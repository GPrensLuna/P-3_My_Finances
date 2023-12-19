import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { done } = req.body; 

    if (done === undefined || done === null) {
      return res.status(400).json({ error: 'The "done" attribute is required in the request body' });
    }

    // Find the task by ID and update the 'done' attribute
    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { $set: { done } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};
