const express = require('express')
const Car = require("../models/Car.js")
const { authenticateToken, isAdmin } = require("../middleware/auth.js")
const router = express.Router()

// Get all cars
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query

    // Build filter object
    const filter = {}
    if (category) filter.category = category
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const cars = await Car.find(filter)
    res.json(cars)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get car by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ message: "Car not found" })
    res.json(car)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new car (admin only)
router.post("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const car = new Car(req.body)
    const savedCar = await car.save()
    res.status(201).json(savedCar)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update car (admin only)
router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!car) return res.status(404).json({ message: "Car not found" })
    res.json(car)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete car (admin only)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id)
    if (!car) return res.status(404).json({ message: "Car not found" })
    res.json({ message: "Car deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Check car availability for specific dates
router.get("/:id/availability", async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" })
    }

    // Logic to check if car is available for the given dates
    // This would involve checking the Booking collection

    res.json({ available: true }) // Placeholder response
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router

