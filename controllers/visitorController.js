const Visitor = require('../models/Visitors');

// Increment visitor count

exports.incrementVisitorCount = async (req, res) => {
  try {
    const visitor = await Visitor.findOne();
    if (!visitor) {
      // If no visitor document exists, create one
      const newVisitor = new Visitor({ count: 1 });
      await newVisitor.save();
      return res.json({ message: "Visitor count updated successfully", count: newVisitor.count });
    } else {
      // If visitor document exists, increment the count
      visitor.count += 1;
      await visitor.save();
      res.json({ message: "Visitor count updated successfully", count: visitor.count });
    }
  } catch (error) {
    console.error('Error updating visitor count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
