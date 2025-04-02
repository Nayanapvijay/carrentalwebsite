const express = require('express')
const jwt = require("jsonwebtoken");
const User = require ("../models/User.js")
const { authenticateToken } = require ("../middleware/auth.js")

const router = express.Router()

// Register new user
router.post("/register", async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" })
    }

    const user = new User(req.body)
    await user.save()

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    // Don't allow password update through this route
    if (req.body.password) delete req.body.password

    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true }).select(
      "-password",
    )

    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

