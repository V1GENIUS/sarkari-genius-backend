const mongoose = require('mongoose');
require('dotenv').config();

MONGO = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://SarkariGenius:Ektuhinirankar123@geniuscluster.wsjvs.mongodb.net/?retryWrites=true&w=majority&appName=GeniusCluster');
    // mongodb+srv://SarkariGenius:Ektuhinirankar123@geniuscluster.wsjvs.mongodb.net/?retryWrites=true&w=majority&appName=GeniusCluster
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); 
  }
};

module.exports = connectDB;
