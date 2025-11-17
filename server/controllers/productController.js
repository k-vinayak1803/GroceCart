import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

// Add Product : /api/product/add
export const addProduct = async (req, resp) => {
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        await Product.create({ ...productData, image: imagesUrl })

        resp.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = JSON.parse(req.body.productData);

        // Existing product
        const product = await Product.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Update basic fields
        product.name = productData.name;
        product.description = productData.description;
        product.category = productData.category;
        product.price = productData.price;
        product.offerPrice = productData.offerPrice;

        // If new images uploaded
        if (req.files && req.files.length > 0) {
            const imageUrls = req.files.map(file => file.path);
            product.image = imageUrls; // replace old images
        }

        await product.save();

        res.json({ success: true, message: "Product updated successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Get Product List : /api/product/list
export const productList = async (req, resp) => {
    try {
        const products = await Product.find({})
        resp.json({ success: true, products })
    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })
    }
}

// Get Single Product : /api/product/id
export const productById = async (req, resp) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)

        resp.json({ success: true, product })
    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })
    }
}

// Change Product inStock : /api/product/add
export const changeStock = async (req, resp) => {
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, { inStock })
        resp.json({ success: true, message: 'Stock Updated' })

    } catch (error) {
        console.log(error.message)
        resp.json({ success: false, message: error.message })
    }
}