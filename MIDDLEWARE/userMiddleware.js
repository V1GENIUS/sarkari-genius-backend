const jwt = require("jsonwebtoken");

// Protect route by validating JWT
exports.protect = (req, res, next) => {
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
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

const blacklist = new Set();

// Middleware to check if the token is blacklisted
const isBlacklisted = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (blacklist.has(token)) {
    return res.status(401).json({ message: "Token is invalidated" });
  }
  next();
};

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
