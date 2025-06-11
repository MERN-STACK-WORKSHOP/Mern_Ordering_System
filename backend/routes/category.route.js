const express = require("express");
const router = express.Router();
const { authorizeAbility } = require("../middlewares/authorize");
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../controllers/category.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post(
  "/",
  verifyToken,
  authorizeAbility("create", "Category"),
  addCategory
);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put(
  "/:id",
  verifyToken,
  authorizeAbility("update", "Category"),
  updateCategory
);

module.exports = router;
