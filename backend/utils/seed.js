const Category = require("../models/category.schema");

const BASE_URL = "https://fakestoreapi.in";

/**
 * Seed category data for the database
 * @description This function seeds the database with category data loaded from a fakestoreapi.in
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

module.exports = {
  seedCategories,
};
