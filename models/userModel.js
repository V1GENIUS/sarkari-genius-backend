const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, enum: ["user", "admin"], default: "user" }, 
  resetToken: { type: String },
  resetTokenExpire: { type: Date },

});

const User = mongoose.model("User", userSchema);

module.exports = User;
