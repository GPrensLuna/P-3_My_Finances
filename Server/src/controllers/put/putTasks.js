import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  const { id } = req.params; 
  const updatedData = req.body; 

  try {
    const existingTask = await Tasks.findById(id);

    if (!existingTask) {
      return res.status(404).json({ message: 'tasks not found' });
    }

    await Tasks.findByIdAndUpdate(id, updatedData);

    const updatedTask = await Tasks.findById(id);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error internal server' });
  }
};
