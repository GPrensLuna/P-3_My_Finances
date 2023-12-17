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
  
    const modifiedShoppingInfo = shoppingInfo.map(item => ({
      _id: item._id,
      concept: item.concept.name,
      type: item.type.name, 
      description: item.description,
      value: item.value,
      deleted: item.deleted,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    res.status(200).json(modifiedShoppingInfo);
  } catch (error) {
    console.error('Error fetching information:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};
