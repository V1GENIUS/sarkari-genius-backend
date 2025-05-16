const {jobRoutes ,cardRoutes ,dashboardRoutes, connectDB ,userRoutes  ,express ,cors ,BASEURL } = require('./import')
require('dotenv').config();
const app = express();
const port = process.env.PORT ||7000 ;

// Use CORS middlewa
app.use(cors({
  origin : BASEURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  credentials: true
}));

app.use(express.json());
connectDB();

// routes
app.use("/api/jobs", jobRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get('/api/ping', (req, res) => {
  res.send('pong');
});


if (!port) {
  throw new Error("PORT is not defined in the environment variables.");
}

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
