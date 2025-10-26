import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'

//Orders placed using stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "stripe",
            payment: true,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//Orders placed using Algorand
const placeOrderAlgorand = async (req, res) => {

}


//All orders data for Admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Order placed by user
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// Update order status from admin panel
const updateStatus = async (req, res) => {

}


export { placeOrderStripe, placeOrderAlgorand, allOrders, userOrders, updateStatus } 