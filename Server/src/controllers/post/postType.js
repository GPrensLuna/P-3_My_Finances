import Type from '../../models/Type.js';

export const postType = async (req, res) => {
  const { type } = req.body;

  try {
    const typeObj = await Type.findOneAndUpdate(
      { name: type },
      { name: type },
      { upsert: true, new: true }
    );

    res.json(typeObj);
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
