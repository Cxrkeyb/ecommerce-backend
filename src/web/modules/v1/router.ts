import express from "express";

// Auth router
import authRouter from "@/web/modules/v1/auth/router";

// Product router
import productRouter from "@/web/modules/v1/product/router";

// Order router
import orderRouter from "@/web/modules/v1/order/router";

const router = express.Router();

// Auth
router.use("/auth", authRouter);

// Products
router.use("/products", productRouter);

// Orders
router.use("/orders", orderRouter);

export default router;
