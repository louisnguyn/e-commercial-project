import express from 'express';
import fileUpload from 'express-fileupload'; 
import dotenv from 'dotenv';
import { homeRouter } from './routes/homeRoute.js';
import { productRouter } from './routes/productRoute.js';
import { orderRouter } from './routes/orderRoute.js';
import { cartRouter } from './routes/cartRoute.js';
import { chatRouter } from './routes/chatRoute.js';
import { profileRouter } from './routes/profileRoute.js';
import { loginRouter, registerRouter } from './routes/userManagementRoute.js';

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(fileUpload());
app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);
app.use('/cart',cartRouter);
app.use('/chat',chatRouter);
app.use('/profile',profileRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});