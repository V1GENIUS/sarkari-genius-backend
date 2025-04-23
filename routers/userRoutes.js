const express = require("express");
const { register, login ,logout ,googleLogin ,forgotPassword, resetPassword  } = require("../controllers/userController");
const { authMiddleware, adminOnly ,forgotPasswordLimiter } = require("../MIDDLEWARE/userMiddleware");

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);  
router.post("/google-login", googleLogin); 
router.post("/logout", authMiddleware, logout);  
router.post('/forgot-password',forgotPasswordLimiter, forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Admin-only route example
router.get("/admin-data", authMiddleware, adminOnly, (req, res) => {
  res.status(200).json({ message: "This is an admin-only resource" });
});

// User-only route example
router.get("/user-data",authMiddleware, (req, res) => {
  res.status(200).json({ message: "Welcome User, here is your data" });
});

module.exports = router;
