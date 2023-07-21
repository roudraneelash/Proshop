const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// Protect routes
module.exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SCR);
    const userId = decoded.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

module.exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as not an admin" });
  }
};
