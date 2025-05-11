import express from 'express';
import * as cartController from '../controllers/cartController.js';

export const cartRouter = express.Router();
cartRouter.get('/', cartController.renderCartPage);