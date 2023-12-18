import Tasks from '../../models/Tasks.js';
import Concept from '../../models/Concept.js';
import Type from '../../models/Type.js';

export const postInsectTasks = async (req, res) => {
  const { name,concept, type, description, value, done ,deleted} = req.body;
  console.log('req.body', req.body)

 if (!name || !concept || !type || !description || !value) {
  return res.status(400).json({ error: 'All fields must be provided.' });
}


  const lowerCaseConcept = concept.toLowerCase();
  const lowerCaseType = type.toLowerCase();
  const lowerCaseName = name.toLowerCase();

  if (isNaN(value)) {
    return res.status(400).json({ error: 'Value must be a numeric value.' });
  }

  try {
    const conceptObj = await Concept.findOneAndUpdate(
      { name: lowerCaseConcept },
      { name: lowerCaseConcept },
      { upsert: true, new: true }
    );

    const typeObj = await Type.findOneAndUpdate(
      { name: lowerCaseType },
      { name: lowerCaseType },
      { upsert: true, new: true }
    );

    const newTasks = new Tasks({
      name:lowerCaseName,
      concept: conceptObj._id,
      type: typeObj._id,
      description,
      value,
      done,
      deleted,
    });

    const savedTasks = await newTasks.save();

    res.json(savedTasks);
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
