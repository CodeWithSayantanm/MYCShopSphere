import {
  getAllWishlistRepo,
  addWishlistRepo,
  getWishlistItemRepo,
  addWishlistItemRepo,
  deleteWishlistItemRepo,
} from "../repo/wishlistRepo.js";

export const getAllWishlistService = async (user) => {
  try {
    return await getAllWishlistRepo(user.id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const addWishlistService = async (user) => {
  try {
    return await addWishlistRepo(user.id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const getWishlistItemService = async (wishlistId) => {
  try {
    return await getWishlistItemRepo(wishlistId);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const addWishlistItemService = async (wishlistId, item_id) => {
  try {
    return await addWishlistItemRepo(wishlistId, item_id);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

export const deleteWishlistItemService = async (wishlistId, itemId) => {
  try {
    return await deleteWishlistItemRepo(wishlistId, itemId);
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};
