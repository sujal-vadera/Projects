
// this file connect to the server
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./backend/config/db');


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./backend/routes/authRoutes"));
app.use("/api/auth", require("./backend/routes/admin/CategoryRoutes"))
app.use("/api/auth", require("./backend/routes/admin/CityRoutes"))


// DB connect
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
