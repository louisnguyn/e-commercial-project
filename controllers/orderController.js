export async function renderOrderPage(req, res, next) {
    try {
        res.render('order/order.ejs', {
            title: 'Order',
        });
    } catch (error) {
        next(error);
    }
}
