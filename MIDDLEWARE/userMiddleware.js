const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

// Protect route by validating JWT
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    const decoded = jwt.verify(token, "Ektuhinirankar123");
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin-only route guard
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

const blacklist = new Set();


// Logout (invalidate the token by adding it to the blacklist)
exports.logout = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  blacklist.add(token); // Add the token to the blacklist
  res.status(200).json({ message: "Logout successful" });
};

exports.cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl; // Use the request URL as the cache key

  redisClient.get(key, (err, data) => {
    if (err) {
      console.error(err);
      return next(); // Proceed if an error occurs
    }
    if (data) {
      // Cache hit, return the cached data
      return res.json(JSON.parse(data));
    }
    // Cache miss, proceed to the next middleware
    next();
  });
};



const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: "Too many password reset attempts. Please try again later."
});


module.exports ={authMiddleware , adminOnly ,forgotPasswordLimiter}