const Stock = require('../Models/stock_model').default;

const getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getStockById = async (req, res) => {
    try {
      const { item_id } = req.params;
      const stock = await Stock.findOne({ item_id });
  
      if (!stock) {
        return res.status(404).json({ error: `Stock item with item_id ${item_id} not found` });
      }
  
      res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const updateStock = async (req, res) => {
  try {
    const { item_id, quantity_in_stock } = req.body;
    const stock = await Stock.findOneAndUpdate(
      { item_id },
      { quantity_in_stock, last_updated: Date.now() },
      { new: true, upsert: true }
    );
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports={
    getAllStock,
    getStockById,
    updateStock,
}