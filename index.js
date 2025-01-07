const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const jobRoutes = require('./routers/jobRoutes');
const visitorRoutes = require('./routers/visitorsRoute');
const connectDB = require('./Database/connectDB');
const userRoutes = require("./routers/userRoutes");

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'], 
}));



app.use(express.json());
const port = process.env.PORT || 7000;
connectDB();


// routes
app.use('/api', visitorRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);





app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
