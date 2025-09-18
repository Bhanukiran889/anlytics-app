const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});