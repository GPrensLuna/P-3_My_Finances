import Concept from '../../models/Type.js';

export const postConcept = async (req, res) => {
  let { concept } = req.body;

  if (!concept) {
    return res.status(400).json({ error: 'The concept field cannot be empty.' });
  }

  concept = concept.toLowerCase();

  try {
    const existingConcept = await Concept.findOne({name:concept});
    if (existingConcept){
      return res.status(400).json({error: 'Concept already exists.'})
    }
    
    const conceptObj = await Concept.findOneAndUpdate(
      { name: concept },
      { name: concept },
      { upsert: true, new: true }
    );

    res.json(conceptObj);
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
