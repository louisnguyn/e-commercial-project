import { getAllAvailableProducts, getProductById, getProductsByUserId } from '../models/productModel.js';

export async function renderProductPage(req, res, next) {
    try {
        const currentTab = req.path.includes('sell') ? 'sell' : 'purchase';
        let products;
        const userId = req.session.user?.id;
        if (currentTab == 'sell') {
            if (!userId) {
                return res.status(403).send('You must be logged in to view your listings.');
            }
            products = await getProductsByUserId(userId); 
        } else {
            products = await getAllAvailableProducts();
        }
        res.render('product/product.ejs', {
            title: 'Product',
            currentTab,
            products
        });
    } catch (error) {
        next(error);
    }
}

export async function renderProductDescriptionPage(req, res, next) {
    const { id: productId } = req.params;
    try {
        const [product] = await getProductById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product/productDescription.ejs', {
            title: product.title,
            product,
        });
    } catch (error) {
        next(error);
    }
}
