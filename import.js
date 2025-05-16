
const connectDB = require('./Database/connectDB');
const express = require('express');
const cors = require('cors'); 


const userRoutes = require("./routers/userRoutes");
const jobRoutes = require('./routers/jobRoutes');
const cardRoutes = require('./routers/cardRoutes');
const dashboardRoutes = require('./routers/dashboardRoutes')


const  BASEURL = require('./config/URl')


module.exports = {jobRoutes ,cardRoutes ,dashboardRoutes ,connectDB ,userRoutes ,express ,cors ,BASEURL}