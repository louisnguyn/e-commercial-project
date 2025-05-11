import express from 'express';
import * as orderController from '../controllers/orderController.js';

export const orderRouter = express.Router();
orderRouter.get('/', orderController.renderOrderPage);
