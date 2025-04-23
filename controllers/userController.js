const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "Ektuhinirankar123"
require('dotenv').config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("178127019337-sh9cjlturc5ma4b5p0focjm9j4dr2qr1.apps.googleusercontent.com");
const crypto = require('crypto');
const  BASEURL = require('../config/URl')
const nodemailer = require('nodemailer');
const SMTP_USER="sarkari.genius@gmail.com"
const SMTP_PASS="gxkx xbtj hneg uobx"





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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = resetToken;
    user.resetTokenExpire = resetTokenExpire;
    await user.save();

    const resetUrl = `${BASEURL.BASEURL}/reset-password/${resetToken}`;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: SMTP_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 15 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send reset link" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong while resetting password" });
  }
};

