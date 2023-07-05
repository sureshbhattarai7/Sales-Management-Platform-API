const { describe } = require('node:test');
const Product = require('./../Model/productModel');
const { getRepository } = require('typeorm');

exports.createProduct = async (req, res) => {
    try {
        const { productName, price, description, seller, SKU } = req.body;
        const productRepository = getRepository(Product);

        const product = productRepository.create({
            productName, price, description, seller, SKU
        });

        const createdProduct = await productRepository.save(product);

        res.status(200).json({
            status: 'success',
            data: {
                createdProduct
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const productRepository = getRepository(Product);

        const getProducts = await productRepository.find();
        res.status(200).json({
            status: 'success',
            data: {
                getProducts
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const productRepository = getRepository(Product);
        const getProduct = await productRepository.findOne(req.params.id);

        if (!getProduct) {
            res.status(404).json({
                status: 'fail',
                message: 'Product not found!'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                getProduct
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.updateProduct = async (req, res) => {
    try {
        const productRepository = getRepository(Product);
        const product = productRepository.findOne(req.params.id, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found!'
            })
        }

        product.productName = productName;
        product.price = price;
        product.description = description;
        product.seller = seller;

        const updatedProduct = await productRepository.save(product);

        res.status(200).json({
            status: 'success',
            data: {
                updatedProduct
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.deleteProduct = async (req, res) => {
    try {
        const productRepository = getRepository(Product);
        const user = await productRepository.findOne(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found!'
            })
        };

        const deletedUser = await productRepository.remove(user);

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}