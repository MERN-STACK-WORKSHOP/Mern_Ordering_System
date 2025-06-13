const express = require('express');
const router = express.Router();
const { getOrders } = require('../controllers/order.controller');
const { isAuth, isAdmin } = require('../middlewares/orderauth.middleware.js');

// Get orders route with authentication
router.get('/', isAuth, getOrders);

module.exports = router;
