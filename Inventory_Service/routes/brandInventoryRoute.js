import express from "express";
import brandInventoryController from "../controller/brandInventoryController.js";

const brandInventoryRoute = express.Router();

brandInventoryRoute.get('/',brandInventoryController.getAllBrands);
brandInventoryRoute.get('/:brandId',brandInventoryController.getBrandById);
brandInventoryRoute.post('/addBrand',brandInventoryController.addBrand);
brandInventoryRoute.put('/:brandId',brandInventoryController.updateBrandById);
brandInventoryRoute.delete('/:brandId',brandInventoryController.deleteBrandById);

export default brandInventoryRoute;