export async function renderProductPage(req, res, next) {
    try {
        res.render('product/product.ejs', {
            title: 'Product',
        });
    } catch (error) {
        next(error);
    }
}