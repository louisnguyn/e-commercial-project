export async function renderCartPage(req, res, next) {
    try {
        res.render('cart/cart.ejs', {
            title: 'Cart',
        });
    } catch (error) {
        next(error);
    }
}