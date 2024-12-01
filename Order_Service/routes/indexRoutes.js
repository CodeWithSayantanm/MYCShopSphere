import { Router } from "express";
import orderRoutes from "./orderRoutes.js";
import cartRoute from "./cartRoute.js";
import wishlistRoute from "./wishlistRoute.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = Router();

router.use("/", authenticate, orderRoutes);

router.use("/cart", authenticate, cartRoute);

router.use("/wishlist", authenticate, wishlistRoute);

export default router;
