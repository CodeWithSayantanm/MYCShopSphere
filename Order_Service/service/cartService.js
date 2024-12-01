import AppError from "../error/AppError.js";
import {
  addCartRepo,
  getAllCartRepo,
  getCartRepo,
  addCartItemRepo,
  deleteCartItemRepo,
} from "../repo/cartRepo.js";

export const getAllCartService = async (user) => {
  try {
    return await getAllCartRepo(user.id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const addCartService = async (user, items) => {
  try {
    return await addCartRepo(user.id, items);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const getCartService = async (cartId) => {
  try {
    return await getCartRepo(cartId);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const addCartItemService = async (cartId) => {
  try {
    return await addCartItemRepo(cartId);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const deleteCartItemService = async (cartId, item_id) => {
  try {
    return await deleteCartItemRepo(cartId, item_id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
