import { Router } from "express";
import { authRole } from "../middleware/authMiddleware.js";
import {
  getAllWishlistController,
  addWishlistController,
  getWishlistItemController,
  addWishlistItemController,
  deleteWishlistItemController,
} from "../controllers/wishlistController.js";

const router = Router();

router.get("/", authRole, getAllWishlistController);
router.post("/", authRole, addWishlistController);
router.get("/:wishlistId/items", authRole, getWishlistItemController);
router.post(":wishlistId/items", authRole, addWishlistItemController);
router.delete(
  ":wishlistId/items/:itemId",
  authRole,
  deleteWishlistItemController
);

export default router;
