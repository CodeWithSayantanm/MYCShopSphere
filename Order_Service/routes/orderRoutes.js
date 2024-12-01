import { Router } from "express";
import { authRole } from "../middleware/authMiddleware.js";
import {
  getAllOrdersController,
  getOrderController,
  addOrderController,
  updateOrderController,
  deleteOrderController,
  getAllItemsController,
  makePaymentController,
  addShippingController,
  updateShippingController,
} from "../controllers/orderController.js";
const router = Router();

router.get("/", authRole, getAllOrdersController);
router.get("/:orderId", authRole, getOrderController);
router.post("/", authRole, addOrderController);
router.put("/:orderId", authRole, updateOrderController);
router.delete("/:orderId", authRole, deleteOrderController);
router.get("/:orderId/items", authRole, getAllItemsController);
router.post("/:orderId/payment", authRole, makePaymentController);
router.post("/:orderId/shipping", authRole, addShippingController);
router.post("/:orderId/shipping/status", authRole, updateShippingController);

export default router;
