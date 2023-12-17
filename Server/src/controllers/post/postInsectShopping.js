import Shopping from '../../models/Shopping.js';
import Concept from '../../models/Concept.js';
import Type from '../../models/Type.js';

export const postInsectShopping = async (req, res) => {
  const { concept, type, description, value } = req.body;

  if (!concept || !type || !description || !value) {
    return res.status(400).json({ error: 'All fields must be provided.' });
  }

  const lowerCaseConcept = concept.toLowerCase();
  const lowerCaseType = type.toLowerCase();

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

    const newShopping = new Shopping({
      concept: conceptObj.name,
      type: typeObj.name,
      description,
      value,
    });

    const savedShopping = await newShopping.save();

    res.json(savedShopping);
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
