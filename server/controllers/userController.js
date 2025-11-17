import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// Register User
// api/user/register
export const register = async (req, resp) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return resp.json({ success: false, message: 'Missing Details' })


        const existingUser = await User.findOne({ email })
        if (existingUser)
            return resp.status(409).json({ success: false, message: 'User Already Exist' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        resp.cookie('token', token, {
            httpOnly: true,     // Prevent JS to access Cookie
            secure: process.env.NODE_ENV === "production",  // use secure cookie in production
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',  // CSRF Protection
            maxAge: 7 * 24 * 60 * 60 * 1000,   // Cookie Expiration Time

        })

        return resp.json({ success: true, user: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })
    }
}



// Login User : /api/user/login

export const login = async (req, resp) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return resp.json({ success: false, message: 'Email and Password are required' })
        };

        const user = await User.findOne({ email })

        if (!user) {
            return resp.json({ success: false, message: 'Invalid Email or Password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return resp.json({ success: false, message: 'Invalid Password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        resp.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,

        })
        return resp.json({ success: true, user: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })
    }
}

// check Auth : /api/user/is-auth

export const isAuth = async (req, resp) => {
    try {
        const userId  = req.userId
        const user = await User.findById(userId).select("-password")
        return resp.json({ success: true, user })
    } catch (error) {
        return resp.json({ success: false, message: error.message })
    }
}

// Logouyt user : /api/user/logout
export const logout = async (req, resp) => {
    try {
        resp.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return resp.json({ success: true, message: "Logged Out" })

    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })

    }

}

















