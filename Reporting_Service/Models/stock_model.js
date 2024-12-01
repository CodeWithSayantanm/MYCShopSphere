import { Schema, model } from 'mongoose';

const StockSchema = new Schema({
  item_id: { type: Number, unique: true, required: true },
  quantity_in_stock: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now },
});

const stock= model('Stock', StockSchema);
export default stock;