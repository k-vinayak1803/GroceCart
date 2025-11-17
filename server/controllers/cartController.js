import User from "../models/User.js"


// Update User CartData : /api/cart/update 
export const updateCart = async(req,resp)=>{
    try{
        const {userId , cartItems} = req.body

        await User.findByIdAndUpdate(userId,{cartItems})
        resp.json({success: true , message :"Cart Updated"})
    }catch(error){
        resp.json({success: false , message: error.message})
    }
}







