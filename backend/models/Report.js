const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'revenue', 'top-customers', etc.
  params: { type: Object, required: true }, // e.g., { startDate, endDate, ... }
  data: { type: Object, required: true }, // The actual report data
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', ReportSchema);
