import pool from "../config/db.js";

export const getAllOrderRepo = async () => {
  const [result] = await pool.query(`SELECT * FROM TBL_ORDERS `);
  return result[0];
};

export const getOrderRepo = async (id) => {
  const [result] = await pool.query(
    `SELECT * FROM TBL_ORDERS WHERE order_id = ${id}`
  );
  return result[0];
};

export const addOrderRepo = async (
  user_id,
  order_date,
  status,
  total_amount,
  shipping_address_id,
  billing_address_id,
  payment_status,
  effective_date,
  items
) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO tbl_orders (user_id, order_date, status, total_amount, shipping_address_id, billing_address_id, payment_status, effective_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        order_date,
        status,
        total_amount,
        shipping_address_id,
        billing_address_id,
        payment_status,
        effective_date,
      ]
    );
    for (let item of items) {
      const total_price = item.price * item.quantity;
      await conn.query(
        `INSERT INTO tbl_order_items (order_id, item_id, quantity, price, total_price) VALUES (?, ?, ?, ?, ?)`,
        [result.insertId, item.item_id, item.quantity, item.price, total_price]
      );
    }

    await conn.commit();
    return result.insertId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export const updateOrderRepo = async (
  id,
  user_id,
  order_date,
  status,
  total_amount,
  shipping_address_id,
  billing_address_id,
  payment_status
) => {
  const todayDate = new Date().toISOString();
  const conn = await pool.getConnection();
  try {
    const prev = await conn.query(
      `SELECT * FROM TBL_ORDERS WHERE order_id = ${id}`
    );
    await conn.query(
      `INSERT INTO tbl_orders (user_id, order_date, status, total_amount, shipping_address_id, billing_address_id, payment_status, effective_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        prev[0].user_id,
        prev[0].order_date,
        "updated",
        prev[0].total_amount,
        prev[0].shipping_address_id,
        prev[0].billing_address_id,
        prev[0].payment_status,
        todayDate,
      ]
    );
    const [result] = await conn.query(
      `UPDATE tbl_orders SET user_id = ?, order_date = ?, status = ?, total_amount = ?, shipping_address_id = ?, billing_address_id = ?, payment_status = ?, effectiveDate = ? WHERE order_id = ?;
`,
      [
        user_id,
        order_date,
        status,
        total_amount,
        shipping_address_id,
        billing_address_id,
        payment_status,
        prev[0].effectiveDate,
        id,
      ]
    );
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export const deleteOrderRepo = async (id) => {
  const effectiveDate = new Date().toISOString().split("T")[0];
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `UPDATE TBL_ORDERS SET status = ?, effective_date = ? WHERE order_id = ?`,
      ["cancelled", effectiveDate, id]
    );
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export const getAllItemsRepo = async (id) => {
  const [result] = await pool.query(
    `SELECT * FROM TBL_ORDER_ITEMS WHERE order_id = ${id}`
  );
  return result;
};

export const makePaymentRepo = async (
  id,
  payment_method,
  amount,
  payment_status
) => {
  const payment_date = new Date().toISOString();
  const conn = await pool.getConnection();
  const effectiveDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  ).toISOString();
  try {
    const [result] = await conn.query(
      `INSERT INTO TBL_ORDER_PAYMENT (order_id, payment_method, payment_date, amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, payment_method, payment_date, amount, "success"]
    );

    await conn.commit();
    return result.insertId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export const addShippingRepo = async (
  id,
  shipping_method,
  shipping_date,
  delivery_date,
  shipping_status
) => {
  const conn = await pool.getConnection();
  const effectiveDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  ).toISOString();
  try {
    const [result] = await conn.query(
      `INSERT INTO TBL_SHIPPING (order_id, shipping_method, shipping_date, delivery_date, shipping_status) VALUES (?, ?, ?, ?, ?)`,
      [id, shipping_method, shipping_date, delivery_date, "success"]
    );
    await conn.commit();
    return result.insertId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export const updateShippingRepo = async (id, status) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `UPDATE TBL_SHIPPING SET shipping_status = ${status} WHERE order_id = ${id};`
    );
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
