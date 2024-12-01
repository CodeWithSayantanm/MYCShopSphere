import itemInventoryRepository from "../repository/itemInventoryRepository.js";

const addItem = async ( item_code,item_name, description, price, stock_quantity, status, size_id, brand_id, color_id) => {
    return await itemInventoryRepository.addItem(item_code,item_name, description, price, stock_quantity, status, size_id, brand_id, color_id);
}
const getAllItems = async () => {
    return await itemInventoryRepository.getAllItems();
}
const getItemById = async (item_id) => {
    return await itemInventoryRepository.getItemById(item_id);
}
const updateItem = async ( item_id, item_code, item_name, description, price, stock_quantity, status, size_id, brand_id, color_id) => {
    return await itemInventoryRepository.updateItem(item_id, item_code, item_name, description, price, stock_quantity, status, size_id, brand_id, color_id);
}
const deleteItem = async (item_id) => {
    return await itemInventoryRepository.deleteItem(item_id);
}
const addImage = async (itemId,originalname, location) => {
    return await itemInventoryRepository.addImage(itemId,originalname, location);
}
const deleteImageById = async (itemId, imageId) => {
    return await itemInventoryRepository.deleteImageById(itemId, imageId);
}
export default {
    addItem,
    getAllItems,
    getItemById,
    deleteItem,
    updateItem,
    addImage,
    deleteImageById
};