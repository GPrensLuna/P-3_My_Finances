import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    const taskId = req.params.id; 

    const { done, deleted } = req.body;

    const updateFields = {};

    if (done !== undefined) {
      updateFields.done = done;
    }

    if (deleted !== undefined) {
      updateFields.deleted = deleted;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      updateFields,
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      _id: updatedTask._id,
      done: updatedTask.done,
      deleted: updatedTask.deleted,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};
