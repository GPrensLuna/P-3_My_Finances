import Type from '../../models/Type.js';

export const getType = async (req, res) => {
  try {
    const typeInfo = await Type.find()
    res.status(200).json(typeInfo);
  } catch (error) {
    console.error('Error al obtener la información:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};