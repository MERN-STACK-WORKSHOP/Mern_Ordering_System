const Category = require("../models/category.schema");
const Product = require("../models/product.schema");
const fetch = require("node-fetch");

const BASE_URL = "https://fakestoreapi.in/api";

/**
 * Seed category and product data for the database
 * @description This function seeds the database with category and product data loaded from a fakestoreapi.in
 */

const seedCategories = async () => {
  try {
    const categoriesList = [
      { name: "tv" },
      { name: "audio" },
      { name: "laptop" },
      { name: "mobile" },
      { name: "gaming" },
      { name: "appliances" },
      { name: "furniture" },
      { name: "clothing" },
      { name: "shoes" },
      { name: "jewelry" },
    ];
    await Category.insertMany(categoriesList);
    console.log("Categories seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

const seedProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const categories = await Category.find();
    const { products } = await response.json();

    const productsList = products.map((product) => {
      const category = categories.find(
        (category) => category.name === product.category
      );
      return {
        name: product.title,
        description: product.description,
        imageUrl: product.image,
        price: product.price,
        stock: product.stock,
        discount: product.discount,
        tags: product.tags,
        category: category._id,
      };
    });

    await Product.insertMany(productsList);
    console.log("Products seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedCategories,
  seedProducts,
};
