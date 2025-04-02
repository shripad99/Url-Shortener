const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const authRoutes = require("./routes/auth");

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connected');
    }
)
app.use(
    cors({
        origin: '*',
    })
)


app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);