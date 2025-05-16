import express from 'express';
import * as saleController from '../controllers/saleController.js';

export const salesRouter = express.Router();
salesRouter.get('/', saleController.renderSalesPage);