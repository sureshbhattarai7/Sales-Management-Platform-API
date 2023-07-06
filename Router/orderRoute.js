const express = require('express');
const orderController = require('./../Controller/orderController');
const Router = express.Router();

Router.route('/')
    .post(orderController.createOrder)
    .get(orderController.getOrders);

Router.route('/:id').get(orderController.getOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder);

module.exports = Router;