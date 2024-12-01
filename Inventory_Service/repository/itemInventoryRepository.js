import db from "../database/db.js";
import client from "../database/redisStorage/redisConnect.js";
import AppError from "../exceptions/AppError.js";

const addItem = async (item_code,item_name, description, price, stock_quantity, status, size_id, brand_id, color_id) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        // Check if user with the same email already exists
        const [existingItem] = await conn.execute(
            `SELECT * FROM tbl_item_details WHERE item_code =?`,
            [item_code]
        );
        console.log(existingItem[0]);
        
        if (existingItem[0]) {
            throw new AppError("Item already exists.",401);
        }
        const [result] = await conn.execute(
            'INSERT INTO tbl_item_details (item_code,item_name, description, price, stock_quantity, status, size_id, brand_id, color_id) VALUES (?,?,?,?,?,?,?,?,?)',
            [item_code,item_name, description, price, stock_quantity, status, size_id, brand_id, color_id]
        );
        console.log("Item added successfully!");
        await client.set(`ItemCache:${result.insertId}`, JSON.stringify({
            "itemId": result.insertId,
            "itemCode": item_code,
            "ItemName": item_name, 
            "description": description,
            "price": price,
            "quantityInStock": stock_quantity,
            "status": status,
            "sizeId": size_id,
            "brandId": brand_id,
            "colorId": color_id
        }), {
                EX: 900,
          });
        await conn.commit();
        return result.insertId;
    } catch (error) {
        await conn.rollback();
        console.error("Error adding Item:", error);
        throw new AppError("Error adding Item.",500);
    }
    finally {
        conn.release();
    }
}

const getAllItems = async () => {
    const items = await client.get("ItemsCache");
    if (items) {
        return JSON.parse(items);
    }
    const conn = await db.getConnection();
    const [result] = await conn.execute(
        `SELECT * FROM tbl_item_details`
    );
    if (!result[0]) {
        throw new AppError("No items found", 404);
    }
    await client.set("ItemsCache", JSON.stringify(result), { EX: 900 });
    return result;
}

const getItemById = async (itemId) => {
    const item = await client.get(`ItemCache:${itemId}`);
    if (item) {
        return JSON.parse(item);
    }
    const conn = await db.getConnection();
    const [result] = await conn.execute(
        `SELECT * FROM tbl_item_details WHERE item_id =?`,
        [itemId]
    );
    if (!result[0]) {
        throw new AppError("Item not found", 404);
    }
}

const updateItem = async (itemId, item_name, description, price, stock_quantity, status, size_id, brand_id, color_id, created_at, updated_at) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `UPDATE tbl_item_details SET item_name=?, description=?, price=?, stock_quantity=?, status=?, size_id=?, brand_id=?, color_id=? WHERE item_id=?`,
            [item_name, description, price, stock_quantity, status, size_id, brand_id, color_id, itemId]
        );
        console.log("Item updated successfully!");
        await client.set(`ItemCache:${itemId}`, JSON.stringify({
            "ItemName": item_name, 
            "description": description,
            "price": price,
            "quantityInStock": stock_quantity,
            "status": status,
            "sizeId": size_id,
            "brandId": brand_id,
            "colorId": color_id
        }));
        await conn.commit();
        return result.affectedRows;
        
    } catch (error) {
        await conn.rollback();
        console.error("Error updating Item:", error);
        throw new AppError("Error updating Item.",500);
    }
}
const deleteItem = async (itemId) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `DELETE FROM tbl_item_details WHERE item_id =?`,
            [itemId]
        );
        console.log("Item deleted successfully!");
        await client.del(`ItemCache:${itemId}`);
        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error deleting Item:", error);
        throw new AppError("Error deleting Item.",500);
    }
    finally {
        conn.release();
    }
}
const addImage = async (itemId,imageName, imageLocation) => {
    try {
      const [result] = await db.query(
        `INSERT INTO tbl_item_images (item_id, image_name, image_location)
         VALUES (?, ?, ?)`,
        [itemId,imageName, imageLocation]
      );
      return result.insertId; // Return the inserted image ID
    } catch (error) {
      throw new Error(`Database Error: ${error.message}`);
    }
}
const deleteImageById = async (item_id,image_id) => {

}

export default {
    addItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    addImage,
    deleteImageById
};