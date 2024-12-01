import AppError from "../exceptions/AppError.js";
import sizeInventoryService from "../service/sizeInventoryService.js";

const addSize = async(req,res,next) => {
    try {
        const { size_id, size_types, size_value } = req.body;
    if (!size_id || !size_types || !size_value) {
        throw new AppError("All fields are Required",404);
    }
    const sizeId = await sizeInventoryService.addSize(size_id, size_types, size_value);

    if (sizeId.size_types) {
        throw new AppError("Size already Exists", 400);
    }
    if(!sizeId){
        throw new AppError("Failed to add Size", 400);
    }
    res.status(201).json({ message: 'Size added successfully.', sizeId });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAllSizes = async (req, res, next) => {
    try {
        const sizes = await sizeInventoryService.getAllSizes();
        res.status(200).json(sizes);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getSizeById = async (req, res, next) => {
    try {
        const { sizeId } = req.params;
        const size = await sizeInventoryService.getSizeById(sizeId);
        if (!size) {
            throw new AppError("Size not found", 404);
        }
        res.status(200).json(size);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateSizeById = async (req, res, next) => {
    try {
        const { sizeId } = req.params;
        const { size_types, size_value } = req.body;
        if (!sizeId) {
            throw new AppError("Size ID is required", 404);
        }
        if (!size_types || !size_value) {
            throw new AppError("All fields are required to update", 404);
        }
        const updated = await sizeInventoryService.updateSize(sizeId,size_types, size_value);
        if (!updated) {
            throw new AppError("Failed to update Size", 400);
        }
        res.status(200).json({ message: 'Size updated successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteSizeById = async (req, res, next) => {
    try {
        const { sizeId } = req.params;
        if (!sizeId) {
            throw new AppError("Size ID is required", 404);
        }
        const deleted = await sizeInventoryService.deleteSize(sizeId);
        if (!deleted) {
            throw new AppError("Failed to delete Size", 400);
        }
        res.status(200).json({ message: 'Size deleted successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default {
    addSize,
    getAllSizes,
    getSizeById,
    updateSizeById,
    deleteSizeById
};