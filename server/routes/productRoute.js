import express from 'express'
import {upload} from "../configs/multer.js"
import { addProduct, changeStock, updateProduct, productList } from '../controllers/productController.js';
import authSeller from '../middleware/authSeller.js';

const productRouter = express.Router();

productRouter.post('/add',upload.array(["images"]),authSeller,addProduct);
productRouter.post('/update/:id',upload.array(["images"]),authSeller,updateProduct);
productRouter.get('/list',productList);
// productRouter.get('edit/:id', productById);
productRouter.post('/stock', authSeller , changeStock);

export default productRouter
