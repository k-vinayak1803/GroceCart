import { useEffect, useState } from "react"
import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    const currency = import.meta.env.VITE_CURRENCY;
    // Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth')
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch {
            setIsSeller(false)
        }
    }

    // Fetch User Auth Status , user Data and Cart Items
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth')
            if (data.success) {
                setUser(data.user)
                setCartItems(
                    data.user.cartItems && !Array.isArray(data.user.cartItems)
                        ? data.user.cartItems
                        : {}
                );
            }

        } catch {
            setUser(null)
        }
    }

    // Fetch All Products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Add Products to Cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData);
        toast.success('Added to Cart')
    }

    // Update Cart
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success('Cart Updated')
    }

    // Remove Cart Item
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] == 0) {
                delete cartData[itemId]
            }
        }
        toast.success('Removed From Cart')
        setCartItems(cartData)
    }

    // Get Cart Item Cound
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount
    }

    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchSeller();
        fetchProducts();
        if (!user) {
            fetchUser()
        }
    }, [user])

    // update databsse cart items
    const updateCart = async () => {
        try {
            const { data } = await axios.post('/api/cart/update', {
                userId: user._id,   // ✅ add this line
                cartItems
            })
            if (!data.success) {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            updateCart()
        }
    }, [cartItems])

    const value = {
        navigate, user, setUser, setIsSeller, isSeller, setShowUserLogin, showUserLogin, products,
        currency, cartItems, setCartItems, addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery, getCartCount,
        getCartAmount, axios, fetchProducts
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}