import Type from '../../models/Type.js';

export const postType = async (req, res) => {
  let { type } = req.body;

  if (!type) {
    return res.status(400).json({ error: 'The concept field cannot be empty.' });
  }

  type = type.toLowerCase(); 

  try {
    const existingType = await Type.findOne({ name: type });

    if (existingType) {
      return res.status(400).json({ error: 'Type already exists.' });
    }

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
