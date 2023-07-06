const EntitySchema = require('typeorm').EntitySchema;

const Product = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id: {
            primary: true,
            type: Number,
            nullable: false,
        },
        productName: {
            type: String,
            nullable: [false, 'Product name is required!']
        },
        price: {
            type: Number,
            nullable: [false, 'Price is required!']
        },
        description: {
            type: String,
            nullable: [false, 'Description is required!']
        },
        seller: {
            type: String,
            default: 'Anonymous'
        },
        SKU: {
            type: String,
            unique: [true, 'SKU must be unique!'],
            nullable: [false, 'SKU is required!']
        }
    }
});

module.exports = Product;