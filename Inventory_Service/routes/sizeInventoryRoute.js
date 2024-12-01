import express from "express";
import sizeInventoryController from "../controller/sizeInventoryController.js";

const sizeInventoryRoute = express.Router();

sizeInventoryRoute.get('/',sizeInventoryController.getAllSizes);
sizeInventoryRoute.get('/:sizeId',sizeInventoryController.getSizeById);
sizeInventoryRoute.post('/addSize',sizeInventoryController.addSize);
sizeInventoryRoute.put('/:sizeId',sizeInventoryController.updateSizeById);
sizeInventoryRoute.delete('/:sizeId',sizeInventoryController.deleteSizeById);

export default sizeInventoryRoute;