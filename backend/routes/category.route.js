const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../controllers/category.controller");

router.post("/", addCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);

module.exports = router;
