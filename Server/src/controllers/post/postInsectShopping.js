import Shopping from '../../models/Shopping.js';
import Concept from '../../models/Concept.js';
import Type from '../../models/Type.js';

export const postInsectShopping = async (req, res) => {
  const { concept, type, description, value } = req.body;

  try {
    const conceptObj = await Concept.findOneAndUpdate(
      { name: concept },
      { name: concept },
      { upsert: true, new: true }
    );

    const typeObj = await Type.findOneAndUpdate(
      { name: type },
      { name: type },
      { upsert: true, new: true }
    );

    const newShopping = new Shopping({
      concept: conceptObj._id,
      type: typeObj._id,
      description,
      value,
    });

    const savedShopping = await newShopping.save();

    res.json(savedShopping); 
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
