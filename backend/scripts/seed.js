const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Sale = require('../models/Sale');

const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const seed = async () => {
    // connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    // clear collectiosns
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await Sale.deleteMany({});
    console.log('Existing data cleared');

    // create customers
    const regions = ['North', 'South', 'East', 'West', 'Central'];
    const Customers = Array.from({ length: 1000 }, () => ({
        name: faker.person.fullName(),
        region: faker.helpers.arrayElement(regions),
        type: faker.helpers.arrayElement(['Individual', 'Business']),
    }));
    const createdCustomers = await Customer.insertMany(Customers);
    console.log('Customers seeded');

    // create products
    const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];
    const Products = Array.from({ length: 1000 }, () => ({
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(categories),
        price: parseFloat(faker.commerce.price(10, 1000)),
    }));
    const createdProducts = await Product.insertMany(Products);
    console.log('Products seeded');

    // define start and end dates for the last 2 years
    const start = new Date();
    start.setFullYear(start.getFullYear() - 2); // 2 years ago
    const end = new Date();

    // create sales over last 2 years
    const sales = [];
    for (let i = 0; i < 5000; i++) {
        const product = faker.helpers.arrayElement(createdProducts);
        const customer = faker.helpers.arrayElement(createdCustomers);
        const qty = faker.number.int({ min: 1, max: 10 });
        const date = randomDate(start, end);   // works now
        sales.push({
            customer: customer._id,
            product: product._id,
            quantity: qty,
            totalRevenue: product.price * qty,
            reportDate: date,
        });
    }

    // insert sales
    await Sale.insertMany(sales);
    console.log('Sales seeded');
    mongoose.disconnect();
    console.log('MongoDB disconnected');
};

// seed data
seed().catch(err => {
    console.error(err);
    mongoose.disconnect();
});