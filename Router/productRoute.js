const express = require('express');
const productController = require('./../Controller/productController');
const Router = express.Router();

Router.route('/')
    .post(productController.createProduct)
    .get(productController.getProducts);

Router.route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = Router;