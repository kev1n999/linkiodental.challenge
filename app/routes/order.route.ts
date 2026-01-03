import { Router } from "express";
import {
  advancedOrder,
  createOrder,
  listOrders,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

router.post("/", createOrder);
router.get("/", listOrders);
router.patch("/:id/advance", advancedOrder);

export default router;
