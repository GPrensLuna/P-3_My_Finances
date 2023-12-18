import Tasks from '../../models/Tasks.js';

export const getTasks = async (req, res) => {
  try {
    const TasksInfo = await Tasks.find()
      .populate({
        path: 'concept',
        select: 'name', 
      })
      .populate({
        path: 'type',
        select: 'name', 
      });

    const filteredTasks = TasksInfo.filter(item => !item.done && !item.deleted);


    const modifiedTasksInfo = filteredTasks.map(item => ({
      _id: item._id,
      name: item.name,
      concept: item.concept.name,
      type: item.type.name, 
      description: item.description,
      value: item.value,
      done: item.done,
      deleted: item.deleted,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    res.status(200).json(modifiedTasksInfo);
  } catch (error) {
    console.error('Error fetching information:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};
