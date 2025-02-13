// const client = require('../config/redis');

// const cacheMiddleware = (req, res, next) => {
//   const { id } = req.params;

//   client.get(id, (err, data) => {
//     if (err) {
//       console.error('Redis get error:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     if (data) {
//       return res.status(200).json(JSON.parse(data));
//     } else {
//       next();
//     }
//   });
// };

// module.exports = cacheMiddleware;
