const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const {
  seedCategories,
  seedProducts,
  seedUsers,
  seedOrders,
} = require("./utils/seed");
const categoryRoutes = require("./routes/category.route");

// Connect to database
connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use("/api/users", userRoutes);
const orderRoutes = require("./routes/order.routes");

app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

const PORT = process.env.PORT || 3000;

app.get("/seed", async (req, res) => {
  // First time seed and comment it to avoid seeding again if you using local database
  // await Promise.all([
  //   seedCategories(),
  //   seedProducts(),
  //   seedUsers(),
  //   seedOrders(),
  // ]);
  res.json({ message: "Seeded successfully" });
});

connectDB();

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
