const Category = require("../models/category.schema");

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

    const isCategory = await Category.findOne({ name: name.toLowerCase() });
    if (isCategory) {
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

module.exports = { addCategory, getAllCategories, getCategoryById };
