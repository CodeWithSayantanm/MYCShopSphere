import AppError from "../exceptions/AppError.js";
import colorInventoryService from "../service/colorInventoryService.js";

const addColor = async(req,res,next) => {
    try {
        const { color_id, color_name} = req.body;
    if (!color_id || !color_name) {
        throw new AppError("All fields are Required",404);
    }
    const colorId = await colorInventoryService.addColor(color_id, color_name);
        if (!colorId) {
            throw new AppError("Failed to add Color", 400);
        }
        res.status(201).json({ message: 'Color added successfully.', colorId });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAllColors = async (req, res, next) => {
    try {
        const colors = await colorInventoryService.getAllColors();
        res.json(colors);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getColorById = async (req, res, next) => {
    try {
        const { colorId } = req.params;
        const color = await colorInventoryService.getColorById(colorId);
        if (!color) {
            throw new AppError("Color not found", 404);
        }
        res.json(color);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateColorById = async (req, res, next) => {
    try {
        const { colorId } = req.params;
        const { color_name } = req.body;
        if (!colorId) {
            throw new AppError("Color ID is required", 404);
        }
        if (!colorId || !color_name) {
            throw new AppError("No fields to update", 404);
        }
        const updated = await colorInventoryService.updateColor(colorId, color_name);
        if (!updated) {
            throw new AppError("Failed to update Color", 400);
        }
        res.json({ message: 'Color updated successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteColorById = async (req, res, next) => {
    try {
        const { colorId } = req.params;
        if (!colorId) {
            throw new AppError("Color ID is required", 404);
        }
        const deleted = await colorInventoryService.deleteColor(colorId);
        if (!deleted) {
            throw new AppError("Failed to delete Color", 400);
        }
        res.json({ message: 'Color deleted successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default {
    addColor,
    getAllColors,
    getColorById,
    updateColorById,
    deleteColorById
};