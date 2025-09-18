const express = require('express');
const {query, validationResult} = require('express-validator');
const {getRevenue} = require('../controllers/analytics');

const router = express.Router();

const dateChecks = [
  query('startDate').isISO8601().withMessage('startDate required (ISO8601)'),
  query('endDate').isISO8601().withMessage('endDate required (ISO8601)')
];

router.get('/revenue', dateChecks, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   
    getRevenue(req, res, next);
});



module.exports = router;