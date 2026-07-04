import express, { Router } from 'express';
import { createProduct, getSellerProduct, getAllProducts, getProductDetails } from '../controllers/product.controller.js';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProductValidator } from '../validator/product.validator.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

const productRouter = express(Router());

/**
 * @route POST /api/product
 * @description Create a new product
 * @access Private (Seller only)
 */
productRouter.post('/', authenticateSeller, upload.array('images', 7), createProductValidator, createProduct);
// we need to use multer to handle file uploads, and we limit the number of images to 7
// and when we use multer, we need to use it before the validator, because the validator will not be able to access the files if we use it after the validator


/**
 * @route GET /api/product/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
productRouter.get('/seller', authenticateSeller, getSellerProduct);

/**
 * @route GET /api/product
 * @description Get all products
 * @access Public
 */
productRouter.get('/',getAllProducts)

/**
 * @route GET /api/product/details/:id
 * @description Get details of a specific product
 * @access Public
 */
productRouter.get('/details/:id', getProductDetails);

export default productRouter;
