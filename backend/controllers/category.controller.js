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

module.exports = { addCategory };
