const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrders,
  getOrder,
} = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const orderValidationMiddleware = require("../middlewares/order.middleware");
const { authorizeAbility } = require("../middlewares/authorize");
const router = express.Router();

router.post(
  "/",
  orderValidationMiddleware,
  verifyToken,
  authorizeAbility("create", "Order"),
  createOrder
);

router.get(
  "/user_orders",
  verifyToken,
  authorizeAbility("read", "Order"),
  getUserOrders
);
router.get("/", verifyToken, authorizeAbility("read", "all"), getOrders);
router.get("/:id", verifyToken, authorizeAbility("read", "Order"), getOrder);

module.exports = router;
