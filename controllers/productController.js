import { getAllAvailableProducts, getProductById, getProductsByUserId, searchProduct, getFilteredAndSortedProducts, createProduct, updateProduct, deleteProduct, toggleProductStatus } from '../models/productModel.js';
import { format } from 'date-fns';
export async function renderProductPage(req, res, next) {
    try {
        const currentTab = req.path.includes('sell') ? 'sell' : 'purchase';
        let products;
        const { query, category, sort, minPrice, maxPrice } = req.query;
        const userId = req.session.user?.id;
        if (currentTab == 'sell') {
            if (!userId) {
                return res.status(403).send('You must be logged in to view your listings.');
            }
            products = await getProductsByUserId(userId); 
        } else {
            if(!query && !category && !sort && !minPrice && !maxPrice)
            {
                products = await getAllAvailableProducts();
            } else {
                products = await getFilteredAndSortedProducts({ query, category, sort, minPrice, maxPrice });
            }
        }
        res.render('product/product.ejs', {
            title: 'Product',
            currentTab,
            products,
            sort,
            query,
            selectedCategories: Array.isArray(category) ? category : [category],
            minPrice,
            maxPrice,
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

export async function searchProducts(req, res, next) {
    try {
        const { query } = req.query;
        const products = await searchProduct(query);
        res.json(products);
    } catch (error) {
        next(error);
    }
}

export async function renderCreateListingPage(req, res, next) {
    try {
        res.render('product/createListing.ejs', { title: 'Create Listing' });
    } catch (error) {
        next(error);
    }
}

export async function createListing(req, res, next) {
    const { title, price, quantity, description, category} = req.body;
    const userId = req.session.user?.id;
    const status = "Available";
    if (!userId) {
        return res.status(403).send('You must be logged in to create a listing.');
    }
    let image = "/uploads/placeholderImage.jpeg";
    if (req.files && req.files.image) {
        const productImage = req.files.image;
        const uploadPath = `public/uploads/${image.name}`;
        try{    
            await productImage.mv(uploadPath); 
            image = `/uploads/${productImage.name}`; 
        } catch (error) {
            console.error("Failed to save image:", error);
            return res.status(500).send('Failed to save image');
        }
    }
    const date = format(new Date(), 'yyyy-MM-dd');
    console.log({ title, price,status, quantity, date, description, category,image, userId })
    try {
        await createProduct({ title, price,status, quantity,date, description, category,image, userId });
        res.redirect('/products/sell');
    } catch (error) {
        next(error);
    }
}

export async function renderEditListingPage(req, res, next) {
    try {
        const { id } = req.params;
        const [product] = await getProductById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product/editListing.ejs', {
            title: 'Edit Listing', 
            product 
        });
    } catch (error) {
        next(error);
    }
}

export async function editListing(req, res, next) {
    try {
        const { id } = req.params;
        const { title, price, quantity, description, category, image } = req.body;
        await updateProduct({ id, title, price, quantity, description, category, image });
        res.redirect('/products/sell');
    } catch (error) {
        next(error);
    }
}

export async function deleteListing(req, res, next) {
    try {
        const { productId } = req.body;
        await deleteProduct(productId);
        res.redirect('/products/sell');
    } catch (error) {
        next(error);
    }
}

export async function toggleListingStatus(req, res, next) {
    try {
        const { productId } = req.body;
        await toggleProductStatus(productId);
        res.redirect('/products/sell');
    } catch (error) {
        next(error);
    }
}

