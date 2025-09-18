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