import db from "../database/db.js";
import client from "../database/redisStorage/redisConnect.js";
import AppError from "../exceptions/AppError.js";

const addColor = async (color_id, color_name) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        // Check if user with the same email already exists
        const [existingColor] = await conn.execute(
            `SELECT * FROM tbl_item_color WHERE color_id =?`,
            [color_id]
        );

        if (existingColor[0]) {
            console.log(existingColor[0]);
            throw new AppError("Color already exists.",401);
        }
        const [result] = await conn.execute(
            'INSERT INTO tbl_item_color (color_id, color_name) VALUES (?,?)',
            [color_id, color_name]
        );
        console.log("Color added successfully!");
        await client.set(`ColorCache:${result.insertId}`, JSON.stringify({
            "color_id": color_id,
            "ColorName": color_name}), {
                EX: 900,
          });
        await conn.commit();
        return result.insertId;
    } catch (error) {
        await conn.rollback();
        console.error("Error adding Color:", error);
        throw new AppError("Error adding Color.",500);
    }
    finally {
        conn.release();
    }
}
const getAllColors = async() => {
    await db.getConnection();
    try {
        const [results] = await db.execute(
            `SELECT * FROM tbl_item_color`
        );
        if (results.length > 0) {
            return results;
        }
        throw new AppError("No Color found.",404);
    } catch (error) {
        console.error("Error getting all Products:", error);
        throw new AppError("Error getting all Products.",500);
    }
}

const getColorById = async(colorId) => {
    await db.getConnection();
    try {
        const cachedData = await client.get(`ColorCache:${colorId}`);
        if (cachedData) {
        return JSON.parse(cachedData);
        }
        const [result] = await db.execute(
            `SELECT * FROM tbl_item_color WHERE color_id =?`,
            [colorId]
        );
        if (result.length > 0) {
            return result[0];
        }
        throw new AppError("Color not found.",404);
    } catch (error) {
        console.error("Error getting Color by ID:", error);
        throw new AppError("Error getting Color by ID.",500);
    }
}

const updateColor = async(colorId, color_name) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `UPDATE tbl_item_color SET color_name =? WHERE color_id =?`,
            [color_name, colorId]
        );
        if (result.affectedRows === 0) {
            throw new AppError("Color not found.",404);
        }
        await client.del(`ColorCache:${colorId}`);
        await client.set(`ColorCache:${colorId}`, JSON.stringify({
            "color_id": colorId, 
            "ColorName": color_name}), {
                EX: 900,
          });
        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error updating Color:", error);
        throw new AppError("Error updating Color.",500);
    }
    finally {
        conn.release();
    }
}

const deleteColor = async(colorId) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `DELETE FROM tbl_item_color WHERE color_id =?`,
            [colorId]
        );
        if (result.affectedRows === 0) {
            throw new AppError("Color not found.",404);
        }
        await client.del(`ColorCache:${colorId}`);
        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error deleting Color:", error);
        throw new AppError("Error deleting Color.",500);
    }
    finally {
        conn.release();
    }
 
}
export default {
    addColor,
    getAllColors,
    getColorById,
    updateColor,
    deleteColor
};