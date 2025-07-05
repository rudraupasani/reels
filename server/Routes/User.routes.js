const express = require('express');
const userModel = require('../Modals/connect');  // assuming this is your Mongoose model
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const router = express.Router();

// Register API
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already Register" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            username: username,
            password: hashedPassword,
            email: email
        });

        await user.save();

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password , username } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "rudra", { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token , username });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
