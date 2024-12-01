import { Schema, model } from 'mongoose';

const StockMovementSchema = new Schema({
  movement_id: { type: Number, unique: true, required: true },
  item_id: { type: Number, required: true },
  movement_type: { type: String, enum: ['restock', 'sale'], required: true },
  quantity: { type: Number, required: true },
  movement_date: { type: Date, default: Date.now },
});

const stockmove= model('StockMovement', StockMovementSchema);
export default stockmove;