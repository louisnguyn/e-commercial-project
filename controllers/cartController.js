import { addToCart, getCartByUserId, getProductQuantityById, getProductQuantityInCart, removeFromCart, updateCartQuantityByProduct } from '../models/cartModel.js';
import { getProductById } from '../models/productModel.js';
export async function renderCartPage(req, res, next) {
    try {
        const userId = req.session.user?.id;
        if (!userId) {
            return res.redirect('/login');
        }
        const cartItems = await getCartByUserId(userId);
        res.render('cart/cart.ejs', {
            title: 'Cart',
            cartItems 
        });
    } catch (error) {
        next(error);
    }
}

export async function addProductToCart(req, res, next) {
    try {
        const userId = req.session.user?.id;
        if (!userId) {
            return res.json({ success: false, message: 'Need to log in!' });
        }
        const { productId, quantity } = req.body;
        const [product] = await getProductById(productId);
        if (userId === product.userid)
        {
            return res.json({ success: false, message: 'Can not add your product!' });
        }
        const result = await addToCart({ userId, productId, quantity: Number(quantity) || 1 });
        const cartItems = await getCartByUserId(userId);
        const cartCount = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);
        if (result.success) {
            return res.json({ success: true, message: 'Added to cart!', cartCount });
        } else {
            return res.json({ success: false, message: 'Failed to add!', cartCount });
        }
    } catch (error) {
        next(error);
    }
}

export async function removeProductFromCart(req, res, next) {
    try {
        const userId = req.session.user?.id;
        const { productId } = req.body;
        await removeFromCart({ userId, productId });
        res.redirect('/cart');
    } catch (error) {
        next(error);
    }
}

export async function updateCartQuantity(req, res, next) {
    try {
        const userId = req.session.user?.id;
        const { productId, quantity } = req.body;
        const [product] = await getProductQuantityById(productId);
        const maxQuantity = product ? product.quantity : 1;
        const newQuantity = Math.max(1, Math.min(Number(quantity), maxQuantity));
        console.log({ userId, productId, newQuantity }); 
        await updateCartQuantityByProduct({userId,productId,quantity: newQuantity});
        res.redirect('/cart');
    } catch (error) {
        next(error);
    }
}
