const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware.js");
const productsController = require("../controllers/api/productsController");

router
  .route("/")
  .get(productsController.getProducts)
  .post(protect, admin, productsController.createProduct);
router.get("/top", productsController.getTopProducts);
router
  .route("/:id")
  .get(productsController.getProductById)
  .put(protect, admin, productsController.updateProduct)
  .delete(protect, admin, productsController.deleteProduct);
router
  .route("/:id/reviews")
  .post(protect, productsController.createProductReview);

module.exports = router;
