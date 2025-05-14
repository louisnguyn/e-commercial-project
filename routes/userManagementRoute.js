import express from 'express';
import * as userManagement from '../controllers/userController.js';

export const loginRouter = express.Router();
export const registerRouter = express.Router();

// Login routes
loginRouter.get('/', userManagement.renderLoginPage);
loginRouter.post('/', userManagement.loginUser);
loginRouter.get('/logout', userManagement.logoutUser);

// Register routes
registerRouter.get('/', userManagement.renderRegisterPage);
registerRouter.post('/', userManagement.registerUser);