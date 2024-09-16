import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrderByCard,
  placeOrderByCod,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authMiddleware, placeOrderByCod);
orderRouter.post("/card", authMiddleware, placeOrderByCard);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userOrders", authMiddleware, userOrders);
orderRouter.get("/list", authMiddleware, listOrders);
orderRouter.post("/status", authMiddleware, updateStatus);

export default orderRouter;

