const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/category.controller");

router.post("/", addCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

module.exports = router;
