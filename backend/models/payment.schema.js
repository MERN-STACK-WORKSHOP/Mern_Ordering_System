const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "local",
      enum: ["local", "stripe"],
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
      required: true,
    },
    transactionId: { type: String, required: true, unique: true, index: true },
    paidAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("Payment", paymentSchema);
