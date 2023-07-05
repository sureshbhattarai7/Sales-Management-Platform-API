const express = require('express')
const userController = require('./../Controller/userController');
const Router = express.Router();

Router.route('/signup').post(userController.createUser);
Router.route('/login').post(userController.login);

Router.route('/')
    .get(userController.getUsers);

Router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = Router;