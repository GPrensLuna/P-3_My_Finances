import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { done, deleted } = req.body;

    if (!isValidTaskId(taskId)) {
      return res.status(400).json({
        error: 'Invalid Task ID',
      });
    }

    const updateFields = {};

    if (typeof done !== 'undefined') {
      updateFields.done = done;
    }

    if (typeof deleted !== 'undefined') {
      updateFields.deleted = deleted;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        error: 'You must provide at least "done" or "deleted" in the request body',
      });
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      updateFields,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    res.json(updatedTask);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

const isValidTaskId = (taskId) => {
  return typeof taskId === 'string' && taskId.length === 24;
};
