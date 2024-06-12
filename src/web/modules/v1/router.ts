import express from "express";

// Auth router
import authRouter from "@/web/modules/v1/auth/router";

const router = express.Router();

// Auth
router.use("/auth", authRouter);

export default router;
