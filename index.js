const express = require('express');
const cors = require('cors'); 
const jobRoutes = require('./routers/jobRoutes');
const cardRoutes = require('./routers/cardRoutes');
const visitorRoutes = require('./routers/visitorsRoute');
const connectDB = require('./Database/connectDB');
const userRoutes = require("./routers/userRoutes");
require('dotenv').config();
const app = express();
const port = process.env.PORT ||7000 ;


// Use CORS middleware
app.use(cors({

  // origin: 'http://localhost:3000',
   origin: 'https://sarkarigenius.vercel.app',
 
  //  origin: 'https://zany-space-rotary-phone-495jqx5vwqv2jj7q-3000.app.github.dev',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
}));



app.use(express.json());
connectDB();


// routes
app.use('/api', visitorRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/user", userRoutes);





if (!port) {
  throw new Error("PORT is not defined in the environment variables.");
}

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
