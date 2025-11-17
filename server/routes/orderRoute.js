import express from "express"
import authUser from "../middleware/authUser.js"
import {  confirmOrder, getAllOrders, getUserOrders, paymentSuccess, placeOrderCOD, placeOrderStripe } from "../controllers/orderController.js"
import authSeller from "../middleware/authSeller.js"

const orderRouter = express.Router()

orderRouter.post('/cod',authUser,placeOrderCOD)
orderRouter.post('/confirm',confirmOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.get('/user',authUser , getUserOrders)
orderRouter.get('/seller',authSeller ,getAllOrders )

// ✅ Payment success route
orderRouter.post('/payment-success', authUser, paymentSuccess);


export default orderRouter;