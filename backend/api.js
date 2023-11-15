import express from "express";
const router = express.Router();
import { NOT_FOUND, OK } from "./constants/status.constants.js";

//Cookie pasrser

// Routes and Authorizations
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";


//	Routes

//  Health Check route, used for monitoring
router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

//  Auth Routes
router.use("/auth", authRoutes);

//Product Routes
router.use('/products', productRoutes)

//Order Routes
router.use('/orders', orderRoutes)

//  Undefined Routes
router.route("*").all((req, res) => {
    return res.status(NOT_FOUND).json({
        success: false,
        message: "Oops, you have reached an undefined route, please check your request and try again",
    });
});

export default router;