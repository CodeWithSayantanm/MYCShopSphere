import colorInventoryRepository from "../repository/colorInventoryRepository.js";

const addColor = async ( color_id, color_name ) => {
    return await colorInventoryRepository.addColor(color_id, color_name);
}
const getAllColors = async () => {
    return await colorInventoryRepository.getAllColors();
}
const getColorById = async (color_id) => {
    return await colorInventoryRepository.getColorById(color_id);
}
const updateColor = async ( color_id, color_name) => {
    return await colorInventoryRepository.updateColor(color_id, color_name);
}
const deleteColor = async (color_id) => {
    return await colorInventoryRepository.deleteColor(color_id);
}


export default {
    addColor,
    getAllColors,
    getColorById,
    deleteColor,
    updateColor,
};