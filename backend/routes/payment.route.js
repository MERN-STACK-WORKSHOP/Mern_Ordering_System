const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { authorizeAbility } = require("../middlewares/authorize");

router.post(
  "/:id",
  verifyToken,
  authorizeAbility("create", "Payment"),
  createPayment
);

module.exports = router;
