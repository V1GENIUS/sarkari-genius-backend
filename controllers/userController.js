const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user (default role: "user")

exports.register = async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user and generate JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "Ektuhinirankar123", // Replace with your actual secret key
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Token blacklist set (to invalidate logged-out tokens)
const blacklist = new Set();

// Protect route by validating JWT
exports.protect = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // Check if the token is blacklisted
    if (blacklist.has(token)) {
      return res.status(401).json({ message: "Token is invalidated" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, "Ektuhinirankar123");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin-only route guard
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

exports.googleLogin = async (req, res) => {
  try {
    const { email, name } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // If user doesn't exist, create a new one
      user = await User.create({
        name,
        email,
        username: email.split("@")[0],
        password: "", // Leave empty since it's a Google login
        role: "user", // Default role
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Google login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Logout (invalidate the token by adding it to the blacklist)
exports.logout = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  // Add the token to the blacklist
  blacklist.add(token);

  res.status(200).json({ message: "Logout successful" });
};