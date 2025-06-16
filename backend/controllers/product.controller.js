const Category = require("../models/category.schema");
const Product = require("../models/product.schema");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      imageUrl,
      price,
      stock,
      discount,
      tags,
      category,
    } = req.body;

    const exists = await Category.findById(category);
    if (!exists) return res.status(404).json({ message: "Category not found" });

    const product = await Product.create({
      name,
      description,
      imageUrl,
      price,
      stock,
      discount,
      tags,
      category,
    });

    res.status(201).json({ message: "Successfully created", data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const total = await Product.countDocuments();
    const data = await Product.find()
      .populate("category", "name")
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ total, page, pages: Math.ceil(total / limit), data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
};
