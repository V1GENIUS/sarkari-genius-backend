const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "Ektuhinirankar123"
require('dotenv').config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("178127019337-sh9cjlturc5ma4b5p0focjm9j4dr2qr1.apps.googleusercontent.com");



exports.register = async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    


    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role: role || "user",
    });

  
    const token = jwt.sign(
      { id: user._id, role: user.role },
      key, 
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully",token, user, });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user and generate JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exist please signup" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

  
    const token = jwt.sign(
      { id: user._id, role: user.role },
      key , 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message , massage:"erorr 505"});
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
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        username: email.split("@")[0],
        password: "", 
        role: "user",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      key,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Logout (invalidate the token by adding it to the blacklist)
// exports.logout = (req, res) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) {
//     return res.status(400).json({ message: "No token provided" });
//   }

//   // Add the token to the blacklist
//   blacklist.add(token);

//   res.status(200).json({ message: "Logout successful" });
// };


exports.logout = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token, key); // optional, to confirm it's valid
    blacklist.add(token);
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
