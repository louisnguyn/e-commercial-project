import express from 'express';
import * as productController from '../controllers/productController.js';

export const productRouter = express.Router();
productRouter.get('/', productController.renderProductPage);
productRouter.get('/purchase',productController.renderProductPage); 
productRouter.get('/sell', productController.renderProductPage); 
productRouter.get('/search', productController.searchProducts);
productRouter.get('/:id', productController.renderProductDescriptionPage);

productRouter.get('/sell/create', productController.renderCreateListingPage);
productRouter.post('/sell/create', productController.createListing);
productRouter.get('/sell/edit/:id', productController.renderEditListingPage);
productRouter.post('/sell/edit/:id', productController.editListing);
productRouter.post('/sell/delete', productController.deleteListing);
productRouter.post('/sell/toggle-status', productController.toggleListingStatus);
