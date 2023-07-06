const express = require('express');
const userRoute = require('./Router/userRoute');
const productRoute = require('./Router/productRoute');
const orderRoute = require('./Router/orderRoute');
const { DataSource } = require('typeorm');


require('dotenv').config({ path: './config.env' });

const app = express();
app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "Salesdb",
    entities: ["src/entity/*.js"],
    //entities: [Product, User, Order],
    logging: true,
    synchronize: true,
});

myDataSource.initialize().then(() => {
    console.log('Database connected successfully!');
}).catch((err) => {
    console.log('Error connecting database', err);
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is connected at ${PORT}`);
});