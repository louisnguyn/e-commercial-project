import express from 'express';
import * as userManagement from '../controllers/userController.js';

export const loginRouter = express.Router();
export const registerRouter = express.Router();

// Login routes
loginRouter.get('/', userManagement.renderLoginPage);

// Register routes
registerRouter.get('/', userManagement.renderRegisterPage);