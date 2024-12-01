import express from "express";
import itemInventoryController from "../controller/itemInventoryController.js";
import upload from "../utils/upload.js"


const itemInventoryRoute = express.Router();

itemInventoryRoute.get('/',itemInventoryController.getAllItems);
itemInventoryRoute.post('/addItem',itemInventoryController.addItem);
itemInventoryRoute.get('/:itemId',itemInventoryController.getItemById);
itemInventoryRoute.put('/:itemId',itemInventoryController.updateItemById);
itemInventoryRoute.delete('/:itemId',itemInventoryController.deleteItemById);

//changes needed
itemInventoryRoute.use('/:itemId/images/addImage', express.static('uploads')); // Serve static files// Upload route
itemInventoryRoute.post('/:itemId/images/addImage',upload.single('image'), itemInventoryController.addImage);
itemInventoryRoute.delete('/:itemId/images/:imagesId',itemInventoryController.deleteImageById);
export default itemInventoryRoute;