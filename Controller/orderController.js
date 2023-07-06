const Order = require('./../Model/orderModel');
const { getRepository } = require('typeorm');

exports.createOrder = async (req, res) => {
    try {
        const { orderId, orderType, orderDescription, id, price } = req.body;
        const orderRepository = getRepository(Order);

        const order = orderRepository.create({
            orderId,
            orderType,
            orderDescription,
            user: { id, id },
            product: { id, price }
        });

        const createdOrder = await orderRepository.save(order);

        res.status(200).json({
            status: 'success',
            data: {
                createdOrder
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orderRepository = getRepository(Order);
        const order = await orderRepository.find();

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getOrder = async (req, res) => {
    try {
        const orderRepository = getRepository(Order);
        const order = await orderRepository.findOne(req.params.id);

        if (!order) {
            res.status(404).json({
                status: 'fail',
                message: 'Order not found!'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const orderRepository = getRepository(Order);
        const order = await orderRepository.findOneBy(req.params.id, {
            new: true,
            runValidators: true
        });

        if (!order) {
            res.status(404).json({
                status: 'fail',
                message: 'Invalid ID!'
            })
        }
        
        order.orderType = orderType;
        order.orderDescription = orderDescription;

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const orderRepository = getRepository(Order);

        const order = orderRepository.findOne(req.params.id);
        if (!order) {
            res.status(404).json({
                status: 'fail',
                message: 'Order not found!'
            })
        };

        await orderRepository.remove(order);

        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}