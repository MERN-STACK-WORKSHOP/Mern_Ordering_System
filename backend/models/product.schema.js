const { Schema, Types, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
