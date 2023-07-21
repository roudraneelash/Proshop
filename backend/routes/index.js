const path = require("path");
const express = require("express");
const router = express.Router();
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const uploadRoutes = require("./uploadRoutes");

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.get("/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
router.use("/upload", uploadRoutes);

__dirname = path.resolve(); //Set __dirname to current directory
router.use("/uploads", express.static(path.join(__dirname, "/uploads")));

module.exports = router;
