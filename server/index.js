const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const authRoutes = require("./routes/auth");
const urlRoutes = require("./routes/url");

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
app.use("/url", urlRoutes);
app.use(express.static("public"));

const PORT = process.env.PORT || 8000;

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);