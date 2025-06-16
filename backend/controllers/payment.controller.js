const Order = require("../models/order.schema");
const Payment = require("../models/payment.schema");
const payment = require("../utils/payment");
const generateTransactionId = require("../utils/generateTransaction");

const createPayment = async (req, res) => {
  try {
    const { phone } = req.body;
    const { id } = req.params;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const order = await Order.findById(id).populate("items.product", "price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const totalAmount = order.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    if (totalAmount <= 0 || !totalAmount) {
      return res.status(400).json({ message: "Invalid order amount" });
    }

    const transactionId = generateTransactionId();
    const paymentResponse = await payment({
      phone,
      amount: totalAmount,
      transactionId,
      description: `Order Payment for Order ID: ${id}`,
    });

    if (paymentResponse.responseCode !== "200") {
      return res
        .status(400)
        .json({ message: "Payment not created", data: paymentResponse });
    }

    await Payment.create({
      order: order._id,
      paymentMethod: "local",
      status: "success",
      transactionId,
    });

    await order.updateOne({ status: "paid", totalAmount });
    res
      .status(200)
      .json({ message: "Payment created successfully", data: paymentResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPayment,
};
