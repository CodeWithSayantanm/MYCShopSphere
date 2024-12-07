import pool from "../config/db.js";

export const getAllWishlistRepo = async (user_id) => {
  console.log(user_id);
  const [result] = await pool.query(
    `SELECT * FROM TBL_WISHLIST WHERE user_id = ?`,
    [user_id]
  );
  return result;
};

export const addWishlistRepo = async (user_id) => {
  const [result] = await pool.query(
    `INSERT INTO TBL_WISHLIST (user_id) VALUE ( ? )`,
    [user_id]
  );
  return result.insertId;
};

export const getWishlistItemRepo = async (wishlistId) => {
  const [result] = await pool.query(
    `SELECT * FROM TBL_WISHLIST_ITEMS WHERE wishlist_id = ?`,
    [wishlistId]
  );
  return result;
};

export const addWishlistItemRepo = async (wishlistId, item_id) => {
  const [result] = await pool.query(
    `INSERT INTO TBL_WISHLIST_ITEMS (wishlist_id, item_id) VALUE ( ? , ? )`,
    [wishlistId, item_id]
  );
  return result.insertId;
};

export const deleteWishlistItemRepo = async (wishlistId, itemId) => {
  const [result] = await pool.query(
    `DELETE FROM TBL_WISHLIST_ITEMS WHERE wishlist_id = ? AND item_id = ?`,
    [wishlistId, itemId]
  );
  if (result.affectedRows === 0) {
    throw new Error("No matching wishlist item found to delete");
  }
  return result;
};
