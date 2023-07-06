const EntitySchema = require('typeorm').EntitySchema;
//import { ManyToMany, ManyToOne } from 'typeorm';
const User = require('./../Model/userModel');
const Product = require('./../Model/productModel');

const Order = new EntitySchema({
    orderId: {
        primary: true,
        type: Number,
        nullable: false
    },
    orderType: {
        type: String,
        nullable: [false, 'Order type is required!']
    },
    orderDescription: {
        type: String,
        nullable: [false, 'Description is required!']
    },
    relations: {
        User: {
            target: User,
            type: 'many-to-one',
            joinColumn: {
                name: 'id',
                referencedColumnName: 'id'
            },
            eager: true
        },
        Product: {
            target: Product,
            type: 'many-to-one',
            joinColumn: {
                name: 'price'
            },
            eager: true
        }
    }
});

module.exports = Order;