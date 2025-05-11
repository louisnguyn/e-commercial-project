import express from 'express';
import * as productController from '../controllers/productController.js';

export const productRouter = express.Router();
productRouter.get('/', productController.renderProductPage);

