const mongoose = require('mongoose');


const SaleSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    totalRevenue: { type: Number, required: true },
    reportDate: { type: Date, required: true },
});

module.exports = mongoose.model('Sale', SaleSchema);