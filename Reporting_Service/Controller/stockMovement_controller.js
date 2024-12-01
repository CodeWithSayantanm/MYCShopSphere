import StockMovement from '../Models/stockMovement_model.js';

const recordStockMovement = async (req, res) => {
  try {
    const movement = await StockMovement.create(req.body);
    res.status(201).json(movement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getStockMovementById = async (req, res) => {
    try {
      const { movement_id } = req.params;
      const movement = await StockMovement.findOne({ movement_id });
  
      if (!movement) {
        return res.status(404).json({ error: `Stock movement with movement_id ${movement_id} not found` });
      }
  
      res.status(200).json(movement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const getAllStockMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find();
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export{
    getAllStockMovements,
    getStockMovementById,
    recordStockMovement,
};