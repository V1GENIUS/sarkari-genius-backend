const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://SarkariGenius:Ektuhinirankar123@geniuscluster.wsjvs.mongodb.net/?retryWrites=true&w=majority');
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);  // Exit the process with failure
  }
};

module.exports = connectDB;
