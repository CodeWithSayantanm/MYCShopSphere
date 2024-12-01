import {
  getAllOrdersService,
  getOrderService,
  addOrderService,
  updateOrderService,
  deleteOrderService,
  getAllItemsService,
  makePaymentService,
  addShippingService,
  updateShippingService,
} from "../service/orderServices.js";

export const getAllOrdersController = async (req, res, next) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderController = async (req, res, next) => {
  try {
    const orders = await getOrderService(req.params.orderId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const addOrderController = async (req, res, next) => {
  try {
    const ordersId = await addOrderService(req.body, req.user);
    res.status(200).json({ orderId: ordersId });
  } catch (error) {
    next(error);
  }
};

export const updateOrderController = async (req, res, next) => {
  try {
    const ordersId = await updateOrderService(
      req.body,
      req.user,
      req.params.orderId
    );
    res.status(200).json({ orderId: ordersId });
  } catch (error) {
    next(error);
  }
};

export const deleteOrderController = async (req, res, next) => {
  try {
    const ordersId = await deleteOrderService(req.params.orderId);
    res.status(200).json({ orderId: ordersId });
  } catch (error) {
    next(error);
  }
};

export const getAllItemsController = async (req, res, next) => {
  try {
    const orders = await getAllItemsService(req.params.orderId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const makePaymentController = async (req, res, next) => {
  try {
    const ordersId = await makePaymentService(
      req.params.orderId,
      req.body.payment_method,
      req.body.amount,
      req.body.payment_status
    );
    res.status(200).json({ orderId: ordersId });
  } catch (error) {
    next(error);
  }
};

export const addShippingController = async (req, res, next) => {
  try {
    const ordersId = await addShippingService(
      req.params.orderId,
      req.body.shipping_method,
      req.body.shipping_status
    );
    res.status(200).json({ orderId: ordersId });
  } catch (error) {
    next(error);
  }
};

export const updateShippingController = async (req, res, next) => {
  try {
    const ordersId = await updateShippingService(
      req.params.orderId,
      req.body.shipping_status
    );
    res.status(200).json({ orderId: ordersId });
  } catch (error) {
    next(error);
  }
};
