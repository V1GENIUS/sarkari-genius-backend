const express = require('express');
const cors = require('cors'); 
const jobRoutes = require('./routers/jobRoutes');
const cardRoutes = require('./routers/cardRoutes');
const connectDB = require('./Database/connectDB');
const userRoutes = require("./routers/userRoutes");
require('dotenv').config();
const app = express();
const port = process.env.PORT ||7000 ;


// Use CORS middlewa
app.use(cors({

  // origin: 'http://localhost:3000',
   origin: 'https://sarkarigenius.vercel.app',
  //  origin: "http://127.0.0.1:7000/",
  //  origin : 'http://127.0.0.1:3005',
 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  credentials: true
}));



app.use(express.json());
connectDB();


// routes

app.use("/api/jobs", jobRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/user", userRoutes);





if (!port) {
  throw new Error("PORT is not defined in the environment variables.");
}

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
