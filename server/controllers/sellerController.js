import jwt from "jsonwebtoken"

// Seller Login : /api/seller/login
export const sellerLogin = async(req,resp)=>{
  try{  const {email,password} = req.body

    if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
        const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'7d'})
        resp.cookie("sellerToken",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return resp.json({success:true , message :"Logged In"})
    }else{
        return resp.json({success:false , message :"Invalid Credentials"})
    }
}catch(error){
    console.log(error.message)
    resp.json({success:false , message :"Invalid Credentials"})
}
}

// Seller Auth : /api/seller/is-auth
export const isSellerAuth = async (req, resp) => {
    try {
        return resp.json({ success: true })
    } catch (error) {
        return resp.json({ success: false, message: error.message })
    }
}

// Seller Logout : /api/seller/logout
export const sellerLogout = async (req, resp) => {
    try {
        resp.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return resp.json({ success: true, message: "Seller Logged Out" })

    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })

    }

}