export async function renderSalesPage(req, res, next) {
    try {
        res.render('sale/sales.ejs', { 
            title: 'Sales',
        });
    } catch (error) {
        next(error);
    }
}