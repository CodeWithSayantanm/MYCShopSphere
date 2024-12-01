import {
  getAllWishlistService,
  addWishlistService,
  getWishlistItemService,
  addWishlistItemService,
  deleteWishlistItemService,
} from "../service/wishlistService.js";

export const getAllWishlistController = async (req, res, next) => {
  try {
    const wishlist = await getAllWishlistService(req.user);
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const addWishlistController = async (req, res, next) => {
  try {
    const wishlistId = await addWishlistService(req.user);
    res.status(200).json({ wishlistId: wishlistId });
  } catch (error) {
    next(error);
  }
};

export const getWishlistItemController = async (req, res, next) => {
  try {
    const wishlist = await getWishlistItemService(req.params.wishlistId);
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

export const addWishlistItemController = async (req, res, next) => {
  try {
    const wishlistId = await addWishlistItemService(
      req.params.wishlistId,
      req.body.item_id
    );
    res.status(200).json({ wishlistId: wishlistId });
  } catch (error) {
    next(error);
  }
};

export const deleteWishlistItemController = async (req, res, next) => {
  try {
    const wishlist = await deleteWishlistItemService(
      req.params.wishlistId,
      req.params.itemId
    );
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};
