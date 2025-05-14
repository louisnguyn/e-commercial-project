export async function renderProductPage(req, res, next) {
    try {
        const currentTab = req.path.includes('sell') ? 'sell' : 'purchase';
        res.render('product/product.ejs', {
            title: 'Product',
            currentTab
        });
    } catch (error) {
        next(error);
    }
}
