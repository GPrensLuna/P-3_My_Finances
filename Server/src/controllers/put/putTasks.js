import Tasks from '../../models/Tasks.js';

export const putTasks = async (req, res) => {
  try {
    // Extracting task ID from request parameters
    const idTasks = req.params.id;
    
    // Extracting 'done' property from request body
    const { done } = req.body; 

    // Updating the task in the database and getting the updated task
    const updatedTask = await Tasks.findByIdAndUpdate(
      idTasks,
      { $set: { done } },
      { new: true }
    );

    // Sending the updated task as a JSON response
    res.status(200).json(updatedTask);
  } catch (error) {
    // Handling errors and sending a 500 Internal Server Error response
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};

