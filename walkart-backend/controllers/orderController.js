import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

// Global variables
const currency = 'inr';
const deliveryCharge = 10;

//Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Orders placed using stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fee',
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        // const session = await stripe.checkout.sessions.create({
        //     success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        //     line_items,
        //     mode: 'payment',
        // })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",

            // 👇 Add these for RBI export compliance
            customer_creation: "always", // creates a new customer automatically
            shipping_address_collection: {
                allowed_countries: ["US", "GB", "CA", "AU", "IN"], // adjust as needed
            },

            // Optional but good for test mode
            customer_email: address.email || "test@example.com",

            metadata: {
                order_id: newOrder._id.toString(),
                user_id: userId,
            },
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Verify Stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
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
        res.json({ success: true, orders });
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
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status updated successfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { placeOrderStripe, placeOrderAlgorand, allOrders, userOrders, updateStatus, verifyStripe } 