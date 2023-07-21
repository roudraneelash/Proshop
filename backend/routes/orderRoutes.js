const express = require("express");
const router = express.Router();
const { addOrderItems } = require("../controllers/api/orderController.js");
const { getMyOrders } = require("../controllers/api/orderController.js");
const { getOrderById } = require("../controllers/api/orderController.js");
const { updateOrderToPaid } = require("../controllers/api/orderController.js");
const {
  updateOrderToDelivered,
} = require("../controllers/api/orderController.js");
const { getOrders } = require("../controllers/api/orderController.js");
const { protect } = require("../middleware/authMiddleware.js");
const { admin } = require("../middleware/authMiddleware.js");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

module.exports = router;
