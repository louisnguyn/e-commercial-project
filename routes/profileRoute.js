import express from 'express';
import * as profileController from '../controllers/profileController.js';

export const profileRouter = express.Router();
profileRouter.get('/', profileController.renderProfilePage);
profileRouter.get('/edit',profileController.renderEditProfilePage);
profileRouter.get('/change-password',profileController.renderChangPasswordPage);
profileRouter.post('/edit', profileController.updateProfile);
profileRouter.post('/change-password', profileController.changePassword);
profileRouter.get('/logout',profileController.logoutUser);
profileRouter.get('/user-rating', profileController.renderUserRatingPage);