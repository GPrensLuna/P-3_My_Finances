import Shopping from '../../models/Shopping.js';

export const getShopping = async (req, res) => {
  try {
    const shoppingInfo = await Shopping.find()
      .populate({
        path: 'concept',
        select: 'name',
      })
      .populate({
        path: 'type',
        select: 'name',
      });
  
    res.status(200).json(shoppingInfo);
  } catch (error) {
    console.error('Error fetching information:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};
