import {
  getAllCartService,
  addCartService,
  getCartService,
  addCartItemService,
  deleteCartItemService,
} from "../service/cartService.js";

export const getAllCartController = async (req, res, next) => {
  try {
    const orders = await getAllCartService(req.user);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const addCartController = async (req, res, next) => {
  try {
    const ordersId = await addCartService(req.user, req.body.items);
    res.status(200).json({ ordersId: ordersId });
  } catch (error) {
    next(error);
  }
};

export const getCartController = async (req, res, next) => {
  try {
    const orders = await getCartService(req.params.cartId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const addCartItemController = async (req, res, next) => {
  try {
    const orders = await addCartItemService(
      req.params.cartId,
      req.body.item_id,
      req.body.quantity
    );
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const deleteCartItemController = async (req, res, next) => {
  try {
    const ordersId = await deleteCartItemService(
      req.params.cartId,
      req.params.itemId
    );
    res.status(200).json({ ordersId: ordersId });
  } catch (error) {
    next(error);
  }
};
