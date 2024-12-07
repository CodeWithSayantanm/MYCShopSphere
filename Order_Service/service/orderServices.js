import AppError from "../error/AppError.js";
import {
  getAllOrderRepo,
  getOrderRepo,
  addOrderRepo,
  updateOrderRepo,
  deleteOrderRepo,
  getAllItemsRepo,
  makePaymentRepo,
  addShippingRepo,
  updateShippingRepo,
} from "../repo/orderRepo.js";

export const getAllOrdersService = async () => {
  try {
    return await getAllOrderRepo();
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const getOrderService = async (order_id) => {
  try {
    return await getOrderRepo(order_id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const addOrderService = async (data, user) => {
  const effectiveDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  )
    .toISOString()
    .split("T")[0];
  try {
    return await addOrderRepo(
      user?.id || 1,
      data.order_date,
      data.status,
      data.total_amount,
      data.shipping_address_id,
      data.billing_address_id,
      data.payment_status,
      effectiveDate,
      data.items
    );
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const updateOrderService = async (data, user, order_id) => {
  try {
    return await updateOrderRepo(
      order_id,
      user?.id || 1,
      data.order_date,
      data.status,
      data.total_amount,
      data.shipping_address_id,
      data.billing_address_id,
      data.payment_status,
      data.items
    );
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const deleteOrderService = async (order_id) => {
  try {
    return await deleteOrderRepo(order_id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const getAllItemsService = async (order_id) => {
  try {
    return await getAllItemsRepo(order_id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const makePaymentService = async (
  order_id,
  payment_method,
  amount,
  payment_status
) => {
  try {
    return await makePaymentRepo(
      order_id,
      payment_method,
      amount,
      payment_status
    );
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const addShippingService = async (
  order_id,
  shipping_method,
  shipping_status
) => {
  const shipping_date = new Date().toISOString().split("T")[0];
  const delivery_date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  try {
    return await addShippingRepo(
      order_id,
      shipping_method,
      shipping_date,
      delivery_date,
      shipping_status
    );
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const updateShippingService = async (order_id, status) => {
  try {
    return await updateShippingRepo(order_id, status);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
