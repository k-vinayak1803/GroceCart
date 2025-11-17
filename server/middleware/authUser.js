import jwt from "jsonwebtoken";


const authUser = async (req, resp, next) => {
    const { token } = req.cookies;

    if (!token) {
        return resp.json({ success: false, message: "Not Authorised" })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (!tokenDecode.id) {
            return resp.json({ success: false, message: "Not Authorised" })
        }
        req.userId =tokenDecode.id;
        next()
    }
    catch (error) {
        resp.json({ success: false, message: error.message })
    }
}

export default authUser;