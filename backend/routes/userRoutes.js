const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/userContoller");
const authMiddleware = require("../middleware/authMiddleware");
// Route: GET /api/users/
// Description: Get all users (only accessible by admin)
router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.admin,
  userController.getUsers
);

// Route: POST /api/users/
// Description: Register a new user
router.post("/", userController.registerUser);

// Route: POST /api/users/logout
// Description: Logout user
router.post("/logout", userController.logoutUser);

// Route: POST /api/users/login
// Description: Authenticate user
router.post("/login", userController.authUser);

// Route: GET /api/users/profile
// Description: Get user profile
router.get("/profile", authMiddleware.protect, userController.getUserProfile);

// Route: PUT /api/users/profile
// Description: Update user profile
router.put(
  "/profile",
  authMiddleware.protect,
  userController.updateUserProfile
);

// Route: DELETE /api/users/:id
// Description: Delete user by ID (only accessible by admin)
router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.admin,
  userController.deleteUser
);

// Route: GET /api/users/:id
// Description: Get user by ID (only accessible by admin)
router.get(
  "/:id",
  authMiddleware.protect,
  authMiddleware.admin,
  userController.getUserById
);

// Route: PUT /api/users/:id
// Description: Update user by ID (only accessible by admin)
router.put(
  "/:id",
  authMiddleware.protect,
  authMiddleware.admin,
  userController.updateUser
);

module.exports = router;
