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
    for (let item of items) {
      await conn.query(
        `INSERT INTO TBL_CART_ITEMS (cart_id, item_id, quantity) VALUES (?, ?, ?)`,
        [result.insertId, item.item_id, item.quantity]
      );
    }
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
  return result;
};

export const addCartItemRepo = async (id, item_id, quantity) => {
  const [result] = await pool.query(
    `INSERT INTO TBL_CART_ITEMS (cart_id, item_id, quantity) VALUES (?, ?, ?)`,
    [id, item_id, quantity]
  );
  return result.insertId;
};

export const deleteCartItemRepo = async (cartId, itemId) => {
  console.log(cartId, itemId);

  const [result] = await pool.query(
    `DELETE FROM TBL_CART_ITEMS WHERE cart_id = ? AND item_id = ?`,
    [cartId, itemId]
  );

  if (result.affectedRows === 0) {
    throw new Error("No item found to delete");
  }
};
