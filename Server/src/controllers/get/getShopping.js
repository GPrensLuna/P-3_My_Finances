import Shopping from '../../models/Shopping.js';

export const getShopping = async (req, res) => {
  try {
    const shoppingInfo = await Shopping.find()
      .populate('concept') 
      .populate('type'); 
    res.status(200).json(shoppingInfo);
  } catch (error) {
    console.error('Error al obtener la información:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};
