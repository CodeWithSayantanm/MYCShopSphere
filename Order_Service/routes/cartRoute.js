import { Router } from "express";
import { authRole } from "../middleware/authMiddleware.js";
import {
  getAllCartController,
  addCartController,
  getCartController,
  addCartItemController,
  deleteCartItemController,
} from "../controllers/cartController.js";
const router = Router();

router.get("/", authRole, getAllCartController);
router.post("/", authRole, addCartController);
router.get("/:cartId/items", authRole, getCartController);
router.post("/:cartId/items", authRole, addCartItemController);
router.delete(":cartId/items/:itemId", authRole, deleteCartItemController);

export default router;
