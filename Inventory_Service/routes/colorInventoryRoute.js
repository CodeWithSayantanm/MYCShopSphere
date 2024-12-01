import express from "express";
import colorInventoryController from "../controller/colorInventoryController.js";

const colorInventoryRoute = express.Router();

colorInventoryRoute.post('/addColor',colorInventoryController.addColor);
colorInventoryRoute.get('/',colorInventoryController.getAllColors);
colorInventoryRoute.get('/:colorId',colorInventoryController.getColorById);
colorInventoryRoute.put('/:colorId',colorInventoryController.updateColorById);
colorInventoryRoute.delete('/:colorId',colorInventoryController.deleteColorById);

export default colorInventoryRoute;