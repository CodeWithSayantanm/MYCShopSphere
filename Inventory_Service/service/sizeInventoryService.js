import sizeInventoryRepository from "../repository/sizeInventoryRepository.js";

const addSize = async ( size_id, size_types, size_value ) => {
    return await sizeInventoryRepository.addSize(size_id, size_types, size_value);
}
const getAllSizes = async () => {
    return await sizeInventoryRepository.getAllSizes();
}
const getSizeById = async (size_id) => {
    return await sizeInventoryRepository.getSizeById(size_id);
}
const deleteSize = async (size_id) => {
    return await sizeInventoryRepository.deleteSize(size_id);
}
const updateSize = async ( size_id, size_types, size_value) => {
    return await sizeInventoryRepository.updateSize(size_id, size_types, size_value);
}

export default {
    addSize,
    getAllSizes,
    getSizeById,
    deleteSize,
    updateSize,
};