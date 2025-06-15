const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const productValidationMiddleware = require("../middlewares/product.middleware");
const { verifyToken } = require("../middlewares/verifyToken");
const { authorizeAbility } = require("../middlewares/authorize");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  productValidationMiddleware,
  verifyToken,
  authorizeAbility("create", "Product"),
  createProduct
);
router.delete(
  "/:id",
  verifyToken,
  authorizeAbility("delete", "Product"),
  deleteProduct
);

module.exports = router;
