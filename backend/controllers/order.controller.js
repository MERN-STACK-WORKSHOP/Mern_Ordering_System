const Order = require('../models/order.schema');
const { isAuth, isAdmin } = require('../middlewares/orderauth.middleware.js');

// Helper function to build query based on filters
const buildQuery = (filters, userId) => {
  const query = {};
  
  // Add user filter if not admin
  if (!isAdmin) {
    query.user = userId;
  }
  
  // Add status filter if provided
  if (filters.status) {
    query.status = filters.status;
  }
  
  // Add date range filter if provided
  if (filters.startDate || filters.endDate) {
    const dateQuery = {};
    if (filters.startDate) {
      dateQuery.$gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      dateQuery.$lte = new Date(filters.endDate);
    }
    query.createdAt = dateQuery;
  }
  
  return query;
};

// Get orders with pagination and filtering
const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;
    const userId = req.user?._id;
    
    // Build query based on filters
    const query = buildQuery({ status, startDate, endDate }, userId);
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalCount = await Order.countDocuments(query);
    
    // Fetch orders with pagination
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);
    
    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

module.exports = {
  getOrders
};
