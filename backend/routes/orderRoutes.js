const express = require('express');
const router = express.Router();
const { 
  addOrderItems, 
  getMyOrders, 
  getOrders, 
  updateOrderToDelivered 
} = require('../controllers/OrderController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware'); // <--- Import Admin Middleware

// Consumer Routes
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);

// Admin Routes
// 1. Get ALL orders (Protected + Admin only)
router.route('/').get(protect, admin, getOrders);

// 2. Mark as Delivered (Protected + Admin only)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;