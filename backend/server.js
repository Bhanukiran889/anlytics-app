const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const analyticsRoutes = require('./router/analytics');
const { errorHandler } = require('./middleware/errorHandler');
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

connectDB();

app.get("/api/health", (req, res) => {
    res.send("API is running...");
});

app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});