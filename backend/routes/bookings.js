const express = require("express")
const Booking = require("../models/Booking.js")
const Car = require("../models/Car.js")
const { authenticateToken, isAdmin } = require("../middleware/auth.js")

const router = express.Router()

// Create new booking
router.post("/", authenticateToken, async (req, res) => {
  try {
    // Check if car exists
    const car = await Car.findById(req.body.car)
    if (!car) return res.status(404).json({ message: "Car not found" })

    // Check if car is available for the requested dates
    const { startDate, endDate } = req.body
    const overlappingBooking = await Booking.findOne({
      car: req.body.car,
      status: { $nin: ["cancelled"] },
      $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    })

    if (overlappingBooking) {
      return res.status(400).json({ message: "Car is not available for the selected dates" })
    }

    // Calculate total price
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    const totalPrice = days * car.price

    // Create booking
    const booking = new Booking({
      ...req.body,
      user: req.user.id,
      totalPrice,
    })

    const savedBooking = await booking.save()
    res.status(201).json(savedBooking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get user's bookings
router.get("/my-bookings", authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("car").sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get booking by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("car").populate("user", "-password")

    if (!booking) return res.status(404).json({ message: "Booking not found" })

    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update booking status (user can cancel, admin can update any status)
router.patch("/:id/status", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: "Booking not found" })

    const { status } = req.body

    // Regular users can only cancel their own bookings
    if (req.user.role !== "admin") {
      if (booking.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" })
      }

      if (status !== "cancelled") {
        return res.status(403).json({ message: "You can only cancel bookings" })
      }
    }

    booking.status = status
    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all bookings (admin only)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car").populate("user", "-password").sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports= router

