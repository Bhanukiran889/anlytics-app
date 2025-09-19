
const express = require('express');
const {query, validationResult} = require('express-validator');
const {getRevenue, getTopProducts} = require('../controllers/analytics');

const router = express.Router();


// Validation middleware
const dateChecks = [
  query('startDate').isISO8601().withMessage('startDate required (ISO8601)'),
  query('endDate').isISO8601().withMessage('endDate required (ISO8601)')
];


// GET /api/analytics/revenue?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get('/revenue', dateChecks, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   
    getRevenue(req, res, next);
});



// GET /api/analytics/top-products?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get('/top-products', dateChecks, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  getTopProducts(req, res, next);
});

// GET /api/analytics/top-customers?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get('/top-customers', dateChecks, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { getTopCustomers } = require('../controllers/analytics');
  getTopCustomers(req, res, next);
});




// GET /api/analytics/sales-by-region?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get('/sales-by-region', dateChecks, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { getSalesByRegion } = require('../controllers/analytics');
  getSalesByRegion(req, res, next);
});




// GET /api/analytics/sales-by-category?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get('/sales-by-category', dateChecks, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { getSalesByCategory } = require('../controllers/analytics');
  getSalesByCategory(req, res, next);
});




module.exports = router;



