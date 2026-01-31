const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/OrderController');
const { protect } = require('../middleware/authMiddleware');

// This route matches POST /api/orders
// 'protect' ensures the user is logged in
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;