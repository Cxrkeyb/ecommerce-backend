import express from "express";

// Auth router
import authRouter from "@/web/modules/v1/auth/router";

// Product router
import productRouter from "@/web/modules/v1/product/router";

const router = express.Router();

// Auth
router.use("/auth", authRouter);

// Products
router.use("/products", productRouter);

export default router;
