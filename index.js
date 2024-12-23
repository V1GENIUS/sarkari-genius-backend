const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
const bodyParser = require('body-parser');
const jobRoutes = require('./routers/jobRoutes');
const { errorHandler } = require('./MIDDLEWARE/errorMiddleware');
const visitorRoutes = require('./routers/visitorsRoute');
const jobLinkRoutes = require('./routers/JobLinkRoute'); 
const connectDB = require('./Database/connectDB');

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your React app to access the backend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'], 
}));



app.use(express.json());
const port = process.env.PORT || 7000;
// Connect to MongoDB
connectDB();
//require('./Database/connectDB');

// Your routes
app.use('/api', visitorRoutes);
// app.use('/api', jobLinkRoutes);
app.use("/api/jobs", jobRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
