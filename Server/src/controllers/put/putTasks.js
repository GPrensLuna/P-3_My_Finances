import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    const idTasks = req.params.id;
    const { done } = req.body; 

    const updatedTask = await Tasks.findByIdAndUpdate(
      idTasks,
      { $set: { done } },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};
