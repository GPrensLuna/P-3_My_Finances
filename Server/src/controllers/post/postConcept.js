import Concept from '../../models/Type.js';

export const postConcept = async (req, res) => {
  const { concept } = req.body;

  try {
    const conceptObj = await Concept.findOneAndUpdate(
      { name: concept },
      { name: concept },
      { upsert: true, new: true }
    );

    res.json(conceptObj);
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
