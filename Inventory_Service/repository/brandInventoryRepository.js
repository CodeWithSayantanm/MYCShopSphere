import db from "../database/db.js";
import client from "../database/redisStorage/redisConnect.js";
import AppError from "../exceptions/AppError.js";

const addBrand = async (brand_id, brand_name) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        // Check if user with the same email already exists
        const [existingBrand] = await conn.execute(
            `SELECT * FROM tbl_item_brand WHERE brand_id =?`,
            [brand_id]
        );
        if (existingBrand[0]) {
            console.log(existingBrand[0]);
            throw new AppError("Brand already exists.",401);
        }
        const [result] = await conn.execute(
            'INSERT INTO tbl_item_brand (brand_id, brand_name) VALUES (?,?)',
            [brand_id, brand_name]
        );
        console.log("Brand added successfully!");
        await client.set(`BrandCache:${result.insertId}`, JSON.stringify({
            "brand_id": brand_id,
            "Brand Name": brand_name}), {
                EX: 900,
          });
        await conn.commit();
        return result.insertId;
    } catch (error) {
        await conn.rollback();
        console.error("Error adding Brand:", error);
        throw new AppError("Error adding Brand.",500);
    }
    finally {
        conn.release();
    }
}
const getAllBrands = async() => {
    await db.getConnection();
    try {
        const [results] = await db.execute(
            `SELECT * FROM tbl_item_brand`
        );
        if (results.length > 0) {
            return results;
        }
        throw new AppError("No Brand found.",404);
    } catch (error) {
        console.error("Error getting all Products:", error);
        throw new AppError("Error getting all Products.",500);
    }
}

const getBrandById = async(brandId) => {
    await db.getConnection();
    try {
        const cachedData = await client.get(`BrandCache:${brandId}`);
        if (cachedData) {
        return JSON.parse(cachedData);
        }
        const [result] = await db.execute(
            `SELECT * FROM tbl_item_brand WHERE brand_id =?`,
            [brandId]
        );
        if (result.length > 0) {
            return result[0];
        }
        throw new AppError("Brand not found.",404);
    } catch (error) {
        console.error("Error getting Brand by ID:", error);
        throw new AppError("Error getting Brand by ID.",500);
    }
}

const updateBrand = async(brand_id, brand_name) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `UPDATE tbl_item_brand SET brand_name =? WHERE brand_id =?`,
            [brand_name, brand_id]
        );
        if (result.affectedRows === 0) {
            throw new AppError("Brand not found.",404);
        }
        await client.del(`BrandCache:${brand_id}`);
        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error updating Brand:", error);
        throw new AppError("Error updating Brand.",500);
    }
    finally {
        conn.release();
    }
}

const deleteBrand = async(brandId) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [result] = await conn.execute(
            `DELETE FROM tbl_item_brand WHERE brand_id =?`,
            [brandId]
        );
        if (result.affectedRows === 0) {
            throw new AppError("Brand not found.",404);
        }
        await client.del(`BrandCache:${brandId}`);
        console.log("Deleted brand");
        
        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        console.error("Error deleting Brand:", error);
        throw new AppError("Error deleting Brand.",500);
    }
    finally {
        conn.release();
    }
 
}
export default {
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
};