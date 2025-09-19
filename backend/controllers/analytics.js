


const Sale = require('../models/Sale');
const mongooss = require('mongoose');

 // GET /api/analytics/revenue?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 exports.getRevenue = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const start =new Date(startDate);
        const end = new Date(endDate);

        const result = await Sale.aggregate([
            // Match sales within date range
            {
                $match: {
                    reportDate: { $gte: start, $lte: end }}},
                    // Group to calculate total revenue, total sales, and average sale value
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalRevenue' },
                    totalSales: { $sum: '$quantity' },
                    avageSaleValue: { $avg: '$totalRevenue' },
                }},
                    // Count total orders
                {
                    $project: { _id: 0, totalRevenue: 1, totalSales: 1, avageSaleValue: 1, orders: 1 

                    }}
        ]);
        res.json(result[0] || { totalRevenue: 0, totalSales: 0, avageSaleValue: 0 });
    } catch (error) {
        next(error);
    }   
};

// GET /api/analytics/top-products?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getTopProducts = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const agg = await Sale.aggregate([
            {$match: { reportDate: { $gte: start, $lte: end }}},
            { $group: {
                _id: '$product',
                totalQuantity: { $sum: '$quantity' },
                totalRevenue: { $sum: '$totalRevenue' },
            }},
            { $sort: { totalRevenue: -1 }},
            { $limit: 5 },
            { $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'product'
            }},
            { $unwind: '$product' },
            { $project: {
                productId: '$product._id',
                productName: '$product.name', 
                category: '$product.category',
                totalQuantity: 1,
                totalRevenue: 1,
                _id: 0
            }}
        ]);
        res.json(agg);
    } catch (error) {
        next(error);
    }
};

// GET /api/analytics/top-customers?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getTopCustomers = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const agg = await Sale.aggregate([
            { $match: { reportDate: { $gte: start, $lte: end } } },
            { $group: {
                _id: '$customer',
                totalSpent: { $sum: '$totalRevenue' },
                totalOrders: { $sum: 1 },
                totalQuantity: { $sum: '$quantity' }
            }},
            { $sort: { totalSpent: -1 } },
            { $limit: 5 },
            { $lookup: {
                from: 'customers',
                localField: '_id',
                foreignField: '_id',
                as: 'customer'
            }},
            { $unwind: '$customer' },
            { $project: {
                customerId: '$customer._id',
                name: '$customer.name',
                region: '$customer.region',
                type: '$customer.type',
                totalSpent: 1,
                totalOrders: 1,
                totalQuantity: 1,
                _id: 0
            }}
        ]);
        res.json(agg);
    } catch (error) {
        next(error);
    }
};

// GET /api/analytics/sales-by-region?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getSalesByRegion = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const agg = await Sale.aggregate([
            { $match: { reportDate: { $gte: start, $lte: end } } },
            { $lookup: {
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customer'
            }},
            { $unwind: '$customer' },
            { $group: {
                _id: '$customer.region',
                totalRevenue: { $sum: '$totalRevenue' },
                totalSales: { $sum: '$quantity' },
                orderCount: { $sum: 1 }
            }},
            { $project: {
                region: '$_id',
                totalRevenue: 1,
                totalSales: 1,
                orderCount: 1,
                _id: 0
            }},
            { $sort: { totalRevenue: -1 } }
        ]);
        res.json(agg);
    } catch (error) {
        next(error);
    }
};



// GET /api/analytics/sales-by-category?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getSalesByCategory = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const agg = await Sale.aggregate([
            { $match: { reportDate: { $gte: start, $lte: end } } },
            { $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'product'
            }},
            { $unwind: '$product' },
            { $group: {
                _id: '$product.category',
                totalRevenue: { $sum: '$totalRevenue' },
                totalSales: { $sum: '$quantity' },
                orderCount: { $sum: 1 }
            }},
            { $project: {
                category: '$_id',
                totalRevenue: 1,
                totalSales: 1,
                orderCount: 1,
                _id: 0
            }},
            { $sort: { totalRevenue: -1 } }
        ]);
        res.json(agg);
    } catch (error) {
        next(error);
    }
};