import jwt from "jsonwebtoken";


const authSeller = async (req, resp, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return resp.json({ success: false, message: "Not Authorised" })
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
        next()
    }else{
        return resp.json({ success: false, message: error.message })
    }
    }catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

export default authSeller