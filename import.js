
const connectDB = require('./Database/connectDB');
const express = require('express');
const cors = require('cors'); 


const userRoutes = require("./routers/userRoutes");
const jobRoutes = require('./routers/jobRoutes');
const cardRoutes = require('./routers/cardRoutes');


const  BASEURL = require('./config/URl')


module.exports = {jobRoutes ,cardRoutes ,connectDB ,userRoutes ,express ,cors ,BASEURL}