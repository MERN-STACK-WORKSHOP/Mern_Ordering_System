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
const categoryValidationMiddleware = require("../middlewares/category.middleware");

router.post(
  "/",
  categoryValidationMiddleware,
  verifyToken,
  authorizeAbility("create", "Category"),
  addCategory
);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put(
  "/:id",
  categoryValidationMiddleware,
  verifyToken,
  authorizeAbility("update", "Category"),
  updateCategory
);

module.exports = router;
