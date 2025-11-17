import Address from "../models/address.js"
import Order from "../models/Order.js"
import Product from "../models/Product.js"
import stripe from "stripe"



// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, resp) => {
    try {
        const { userId, items, address } = req.body

        if (!address || items.length === 0) {
            return resp.json({ success: false, message: "Invalid Data" })
        }

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId, // ✅ plain string
            items: items.map(i => ({
                product: i.product, // ✅ plain string
                quantity: i.quantity
            })),
            address, // ✅ plain string
            amount,
            paymentType: "COD",
            status: 'paid'
        });

        return resp.json({ success: true, message: "Order Placed Succesfully" })

    } catch (error) {
        return resp.json({ success: false, message: error.message })
    }
}

// Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, resp) => {
    try {
        const { userId, items, address } = req.body
        const origin = req.headers.origin || 'http://localhost:5173';

        if (!address || items.length === 0) {
            return resp.json({ success: false, message: "Invalid Data" })
        }

        let productData = [];

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // Add Tax Charge
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId, // ✅ plain string
            items: items.map(i => ({
                product: i.product, // ✅ plain string
                quantity: i.quantity
            })),
            address, // ✅ plain string
            amount,
            paymentType: "Online"
        });


        // create Line items for stripe
        const line_items = productData.map((item) => {
            return {

                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
                },
                quantity: item.quantity,
            }
        })

        // Create Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/payment-success?orderId=${order._id}`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        });

        // Save the session ID to verify later
        order.stripeSessionId = session.id;
        await order.save();

        return resp.json({ success: true, url: session.url });

    } catch (error) {
        return resp.json({ success: false, message: error.message })
    }
}

// Stripe Webhooks to Verify Payment Action :/stripe
export const stripeWebhooks = async (request, response) => {
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`Webhook Error : ${error.message}`)
    }

    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            console.log('succedded')

            // Getting session data
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { orderId, userId } = session.data[0]

            // Mark payment as paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })

            // clear user cart
            await User.findById(userId, { cartItems: {} })
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting session data
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })

            const { orderId } = session.data[0]

            await Order.findByIdAndDelete(orderId)
            break;
        }
        default:
            console.error(`Unhandled event type ${event.type}`)
            break
    }
    response.json({ recieved: true })


}

// Get Order by UserId : /api/order/user
export const getUserOrders = async (req, resp) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [
                { paymentType: "COD" },
                { isPaid: true }
            ]
        }).populate('items.product address').sort({ createdAt: -1 })

        resp.json({ success: true, orders })

    } catch (error) {
        return resp.json({ success: false, message: error.message })
    }
}

// Get All Orders (fro seller / admin) : /api/order/seller
export const getAllOrders = async (req, resp) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 })

        resp.json({ success: true, orders });

    } catch (error) {
        return resp.json({ success: false, message: error.message })
    }
}

// Confirm Order after Stripe Payment : /api/order/confirm
export const confirmOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.json({ success: false, message: "Order ID required" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Only mark paid if not already
        if (!order.isPaid) {
            order.isPaid = true;
            order.status = 'paid';
            await order.save();
        }

        return res.json({ success: true, message: "Payment confirmed successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export const paymentSuccess = async (req, res) => {
    try {
        const { orderId, paymentId } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.isPaid = true;
        order.paymentId = paymentId;
        order.status = "Paid";
        await order.save();

        // ✅ Now clear the cart safely
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.json({ success: true, message: "Payment successful", order });
    } catch (error) {
        console.log("Payment success error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};









