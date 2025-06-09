const Category = require("../models/category.schema");
const Product = require("../models/product.schema");
const User = require("../models/user.schema");
const Order = require("../models/order.schema");

const fetch = require("node-fetch");

const BASE_URL = "https://fakestoreapi.in/api";

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

/**
 * Seed product data for the database
 * @description This function seeds the database with product data loaded from a fakestoreapi.in
 */
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

/**
 * @desc This function seed dummy users for testing
 */
const seedUsers = async () => {
  try {
    const usersList = [
      {
        name: "Mohamed Ali",
        email: "mohamedali@gmail.com",
        password:
          "$2b$10$8bLnnz77pYrMgIuyDvpxLenXuAS57vBEAYfk9V/A4ZQqdEoBOkRG2", // 12345678
        isVerified: true,
      },
      {
        name: "Alia Mohamed",
        email: "aliamoha@gmail.com",
        password:
          "$2b$10$8bLnnz77pYrMgIuyDvpxLenXuAS57vBEAYfk9V/A4ZQqdEoBOkRG2", // 12345678
        isVerified: true,
      },
    ];
    await User.insertMany(usersList);
    console.log("Users seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

/**
 * @dec This function seeds Order
 * @description This function seeds the database. products loaded from the database and generated orders
 */

const seedOrders = async () => {
  try {
    const users = await User.find();
    const products = await Product.find();
    const ordersList = Array.from({ length: 6 }).map(() => {
      const randomSlice = Math.floor(Math.random() * products.length);
      const order = {
        user: users[Math.floor(Math.random() * users.length)]._id,
        items: products.slice(randomSlice, randomSlice + 3).map((product) => {
          return {
            product: product._id,
            quantity: Math.floor(Math.random() * 3) + 1,
            price: product.price,
          };
        }),
        totalAmount: products
          .slice(randomSlice, randomSlice + 3)
          .reduce((total, product) => total + product.price, 0),
      };
      return order;
    });
    await Order.insertMany(ordersList);
    console.log("Orders seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedCategories,
  seedProducts,
  seedUsers,
  seedOrders,
};
