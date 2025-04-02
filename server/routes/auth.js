const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");

// User Registration
router.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "10h",
        });

        return res.status(201).json({ error: false, user, accessToken, message: "Registration Successful" });

    } catch (err) {
        console.error("Error saving user:", err);
        return res.status(500).json({ error: true, message: "Server error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "10h",
        });

        return res.json({ error: false, message: "Login Successful", accessToken });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: true, message: "Server error" });
    }
});

module.exports = router;
