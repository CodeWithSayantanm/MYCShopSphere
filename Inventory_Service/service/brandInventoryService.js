import brandInventoryRepository from "../repository/brandInventoryRepository.js";


const addBrand = async ( brand_id, brand_name ) => {
    return await brandInventoryRepository.addBrand(brand_id, brand_name);
}
const getAllBrands = async () => {
    return await brandInventoryRepository.getAllBrands();
}
const getBrandById = async (brand_id) => {
    return await brandInventoryRepository.getBrandById(brand_id);
}
const deleteBrand = async (brand_id) => {
    return await brandInventoryRepository.deleteBrand(brand_id);
}
const updateBrand = async ( brand_id, brand_name) => {
    return await brandInventoryRepository.updateBrand(brand_id, brand_name);
}

export default {
    addBrand,
    getAllBrands,
    getBrandById,
    deleteBrand,
    updateBrand,
};