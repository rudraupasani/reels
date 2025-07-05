const express = require('express');
const app = express();
const userRoutes = require('./Routes/User.routes');
const database = require('./Config/db');
require('dotenv').config();
const cors = require('cors');

// ✅ Connect to database
database.connecting();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/", userRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
