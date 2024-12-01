import db from "../database/db.js";
import client from "../database/redisStorage/redisConnect.js";
import AppError from "../exceptions/AppError.js";

const addSize = async (size_id, size_types, size_value) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        // Check if user with the same email already exists
        const [existingSize] = await conn.execute(
            `SELECT * FROM tbl_item_size WHERE size_id =?`,
            [size_id]
        );
        if (existingSize[0]) {
            console.log(existingSize[0]);
            return existingSize[0];
        }
        const [result] = await conn.execute(
            'INSERT INTO tbl_item_size (size_id, size_types, size_value) VALUES (?,?,?)',
            [size_id, size_types, size_value]
        );
        console.log("Size added successfully!");
        await client.set(`SizeCache:${result.insertId}`, JSON.stringify({
            "size_id": size_id,
            "SizeType": size_types,
            "SizeValue": size_value}), {
                EX: 900,
          });
        await conn.commit();
        return result.insertId;
    } catch (error) {
        await conn.rollback();
        console.error("Error adding Size:", error);
    }
    finally {
        conn.release();
    }
}
const getAllSizes = async() => {
    await db.getConnection();
    try {
        const [results] = await db.execute(
            `SELECT * FROM tbl_item_size`
        );
        if (results.length > 0) {
            return results;
        }
        throw new AppError("No Size found.",404);
    } catch (error) {
        console.error("Error getting all Products:", error);
        throw new AppError("Error getting all Products.",500);
    }
}

const getSizeById = async(sizeId) => {
    await db.getConnection();
    try {
        const cachedData = await client.get(`SizeCache:${sizeId}`);
        if (cachedData) {
        return JSON.parse(cachedData);
        }
        const [result] = await db.execute(
            `SELECT * FROM tbl_item_size WHERE size_id =?`,
            [sizeId]
        );
        if (result.length > 0) {
            return result[0];
        }
        throw new AppError("Size not found.",404);
    } catch (error) {
        console.error("Error getting Size by ID:", error);
        throw new AppError("Error getting Size by ID.",500);
    }
}

const updateSize = async(size_id, size_types, size_value) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `UPDATE tbl_item_size SET size_types =?, size_value =? WHERE size_id =?`,
            [size_types,size_value, size_id]
        );
        if (result.affectedRows === 0) {
            throw new AppError("Size not found.",404);
        }
        await client.del(`SizeCache:${size_id}`);
        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error updating Size:", error);
        throw new AppError("Error updating Size.",500);
    }
    finally {
        conn.release();
    }
}

const deleteSize = async(sizeId) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `DELETE FROM tbl_item_size WHERE size_id =?`,
            [sizeId]
        );
        if (result.affectedRows === 0) {
            throw new AppError("Size not found.",404);
        }
        await client.del(`SizeCache:${sizeId}`);
        console.log("Deleted size");
        
        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error deleting Size:", error);
        throw new AppError("Error deleting Size.",500);
    }
    finally {
        conn.release();
    }
 
}
export default {
    addSize,
    getAllSizes,
    getSizeById,
    updateSize,
    deleteSize
};