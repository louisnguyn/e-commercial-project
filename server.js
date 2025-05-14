import express from 'express';
import fileUpload from 'express-fileupload'; 
import dotenv from 'dotenv';
import session from 'express-session';
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));
app.use(session({
    secret: "CAz9Tg2>a;M9CuWV@L]nt.9b4|3z9A*b",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}))

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