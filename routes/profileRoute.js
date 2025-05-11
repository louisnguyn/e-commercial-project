import express from 'express';
import * as profileController from '../controllers/profileController.js';

export const profileRouter = express.Router();
profileRouter.get('/', profileController.renderProfilePage);