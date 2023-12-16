import Type from '../../models/Type.js';


export const postConcept = async (req, res) => {
  let { type } = req.body;

  if (!type) {
    return res.status(400).json({ error: 'The concept field cannot be empty.' });
  }

  type = concept.toLowerCase();

  try {
    const typeObj = await Type.findOneAndUpdate(
      { name: type },
      { name: type },
      { upsert: true, new: true }
    );

    res.json(typeObj);
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
