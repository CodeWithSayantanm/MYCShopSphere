import { Router } from 'express';
const indexRouter = Router();
import {getAllSales,getSaleById,createSale} from '../Controller/sales_controller.js';
import { getAllStock, updateStock, getStockById } from '../Controller/stock_controller.js';
import { getAllStockMovements, recordStockMovement, getStockMovementById } from '../Controller/stockMovement_controller.js';

indexRouter.get('/',getAllSales);
indexRouter.get('/:saleId', getSaleById);
indexRouter.post('/', createSale);

indexRouter.get('/', getAllStock);
indexRouter.put('/', updateStock);
indexRouter.get('/:item_id', getStockById);

indexRouter.get('/', getAllStockMovements);
indexRouter.post('/', recordStockMovement);
indexRouter.get('/:movement_id', getStockMovementById);
export default indexRouter ;
