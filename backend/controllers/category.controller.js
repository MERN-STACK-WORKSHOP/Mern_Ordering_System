const Category = require("../models/category.schema");
const Product = require("../models/product.schema");

/**
 * @desc Add a new category
 * @route POST /api/categories
 * @body { name: string }
 * @response { message: string }
 * @access Private
 */
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const isCategoryExist = await Category.findOne({
      name: name.toLowerCase(),
    });
    if (isCategoryExist) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ name: name.toLowerCase() });
    await newCategory.save();
    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Get all categories
 * @route GET /api/categories
 * @response { data: [Object] }
 * @access Public
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Get a category by id
 * @route GET /api/categories/:id
 * @params { id: string }
 * @response { data: Object }
 * @access Public
 */
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc Update a category by id where it is not associated with any products
 * @route PUT /api/categories/:id
 * @params { id: string }
 * @body { name: string }
 * @response { message: string }
 * @access Private
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const isCategoryExist = await Category.findOne({
      name: name.toLowerCase(),
    });

    if (isCategoryExist) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const productCountForCategory = await Product.countDocuments({
      category: id,
    });

    if (productCountForCategory > 0) {
      return res.status(400).json({
        message:
          "Cannot update this category as it is associated with existing products. Alternatively, create a new category.",
      });
    }

    category.name = name.toLowerCase();
    await category.save();

    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
