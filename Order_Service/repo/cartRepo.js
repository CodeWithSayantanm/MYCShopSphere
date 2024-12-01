import pool from "../config/db.js";

export const getAllCartRepo = async (user_id) => {
  const [result] = await pool.query(
    `SELECT * FROM TBL_CART WHERE user_id = ${user_id}`
  );
  return result[0];
};

export const addCartRepo = async (user_id, items) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO TBL_CART (user_id) VALUES ( ? )`,
      [user_id]
    );
    return result.insertId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export const getCartRepo = async (id) => {
  const [result] = await pool.query(
    `SELECT * FROM TBL_CART_ITEMS WHERE cart_id = ${id}`
  );
  return result[0];
};

export const addCartItemRepo = async (id) => {
  const [result] = await pool.query(
    `SELECT * FROM TBL_CART_ITEMS WHERE cart_id = ${id}`
  );
  return result[0];
};

export const deleteCartItemRepo = async (cartId, item_id) => {
  const [result] = await pool.query(
    `DELETE FROM TBL_CART_ITEMS WHERE cart_id = ${cartId} AND item_id = ${item_id}; `
  );
  return result;
};
