import { Schema, Types, model } from 'mongoose';

const SalesSchema = new Schema({
  item_id: { type: Number, required: true },
  quantity_sold: { type: Number, required: true },
  sale_date: { type: Date, default: Date.now },
  total_revenue: { type: Types.Decimal128, required: true },
});

const sales= model('Sales', SalesSchema);
export default sales;