import AppError from "../exceptions/AppError.js";
import brandInventoryService from "../service/brandInventoryService.js";

const addBrand = async(req,res,next) => {
    try {
        const { brand_id, brand_name } = req.body;
    if (!brand_id || !brand_name) {
        throw new AppError("All fields are Required",404);
    }
    const brandId = await brandInventoryService.addBrand(brand_id, brand_name);
        if (!brandId) {
            throw new AppError("Failed to add Brand", 400);
        }
        console.log("bRAND Successfully added");
        
        res.status(201).json({ message: 'Brand added successfully.', brandId });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getAllBrands = async (req, res, next) => {
    try {
        const brands = await brandInventoryService.getAllBrands();
        console.log("GET ALL BRANDS");
        res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getBrandById = async (req, res, next) => {
    try {
        const { brandId } = req.params;
        const brand = await brandInventoryService.getBrandById(brandId);
        if (!brand) {
            throw new AppError("Brand not found", 204);
        }
        console.log("BRAND GET BY ID");
        
        res.status(200).json(brand);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateBrandById = async (req, res, next) => {
    try {
        const { brandId } = req.params;
        const { brand_name } = req.body;
        if (!brandId) {
            throw new AppError("Brand ID is required", 404);
        }
        if (!brand_name) {
            throw new AppError("All fields are required to update", 404);
        }
        const updated = await brandInventoryService.updateBrand(brandId,brand_name);
        if (!updated) {
            throw new AppError("Failed to update Brand", 400);
        }
        console.log("Updated Brand");
        res.status(202).json({ message: 'Brand updated successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteBrandById = async (req, res, next) => {
    try {
        const { brandId } = req.params;
        if (!brandId) {
            throw new AppError("Brand ID is required", 404);
        }
        const deleted = await brandInventoryService.deleteBrand(brandId);
        if (!deleted) {
            throw new AppError("Failed to delete Brand", 400);
        }
        console.log("Successfully deleted");
        
        res.status(202).json({ message: 'Brand deleted successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default {
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById
};