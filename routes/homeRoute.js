import express from 'express';
import * as homeController from '../controllers/homeController.js';

export const homeRouter = express.Router();
homeRouter.get('/',homeController.renderHomePage);