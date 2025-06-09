const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../controllers/category.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/", verifyToken, addCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", verifyToken, updateCategory);

module.exports = router;
