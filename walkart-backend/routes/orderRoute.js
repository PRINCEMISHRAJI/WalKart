import express from 'express';
import { placeOrderStripe, placeOrderAlgorand, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

//Admin Panel features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/algorand', authUser, placeOrderAlgorand);

//User feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;