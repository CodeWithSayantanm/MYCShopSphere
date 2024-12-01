import AppError from "../exceptions/AppError.js";
import itemInventoryService from "../service/itemInventoryService.js";

const addItem = async(req,res,next) => {
    try {
        const { item_code, item_name, description, price, stock_quantity, status, size_id, brand_id, color_id } = req.body;
    if (!item_code || !item_name || !description || !price || !stock_quantity || !status || !size_id || !brand_id || !color_id) {
        throw new AppError("All fields are Required",404);
    }
    const itemId = await itemInventoryService.addItem(item_code, item_name, description, price, stock_quantity, status, size_id, brand_id, color_id);
        if (!itemId) {
            throw new AppError("Failed to add Item", 400);
        }
        res.status(201).json({ message: 'Item added successfully.', itemId });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAllItems = async (req, res, next) => {
    try {
        const items = await itemInventoryService.getAllItems();
        res.json(items);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getItemById = async (req, res, next) => {
    try {
        const {itemId} = req.params;
        const item = await itemInventoryService.getItemById(itemId);
        if (!item) {
            throw new AppError("Item not found", 404);
        }
        res.json(item);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateItemById = async (req, res, next) => {
    try {
        const {itemId} = req.params;
        const { item_name, description, price, stock_quantity, status, size_id, brand_id, color_id} = req.body;
        if (!itemId) {
            throw new AppError("Item ID is required", 404);
        }
        if (!item_name &&!description &&!price &&!stock_quantity &&!status &&!size_id &&!brand_id &&!color_id) {
            throw new AppError("No fields to update", 404);
        }
        const updated = await itemInventoryService.updateItem(itemId, item_name, description, price, stock_quantity, status, size_id, brand_id, color_id);
        if (!updated) {
            throw new AppError("Failed to update Item", 400);
        }
        res.json({ message: 'Item updated successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteItemById = async (req, res, next) => {
    try {
        const {itemId} = req.params;
        if (!itemId) {
            throw new AppError("Item ID is required", 404);
        }
        const deleted = await itemInventoryService.deleteItem(itemId);
        if (!deleted) {
            throw new AppError("Failed to delete Item", 400);
        }
        res.json({ message: 'Item deleted successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const addImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded!' });
      }
      // Extract file details
      const {itemId} = req.params;
      const imageName = req.file.filename;
      const imageLocation = req.file.path;
      // Pass details to the service layer
      const result = await itemInventoryService.addImage(itemId,imageName, imageLocation);
      res.status(201).json({ message: 'File uploaded successfully', imageId: result });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
const deleteImageById = async (req, res) => {
    try {
        const {itemId, imageId} = req.params;
        if (!itemId ||!imageId) {
            throw new AppError("Item ID and Image ID are required", 404);
        }
        const deleted = await itemInventoryService.deleteImageById(itemId, imageId);
        if (!deleted) {
            throw new AppError("Failed to delete Image", 400);
        }
        res.json({ message: 'Image deleted successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default {
    addItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemById,
    addImage,
    deleteImageById
};