const express = require('express')
const userController = require('./../Controller/userController');
const Router = express.Router();

Router.route('/signup').post(userController.createUser);

module.exports = Router;