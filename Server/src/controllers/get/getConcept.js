import Concept from '../../models/Concept.js';

export const getConcept = async (req, res) => {
  try {
    const conceptInfo = await Concept.find()
    res.status(200).json(conceptInfo);
  } catch (error) {
    console.error('Error al obtener la información:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};