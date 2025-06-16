const { Schema, Types, model } = require("mongoose");

const orderItemSchema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.pre("validate", async function (next) {
  await this.populate("items.product");

  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);

  next();
});

module.exports = model("Order", orderSchema);
