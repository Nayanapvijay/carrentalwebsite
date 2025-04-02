const router = require('express').Router()
const Booking = require('../models/Booking')
const Payment = require('../models/Payment')
const User = require('../models/User')
const {authenticateToken} = require('../middleware/auth')

// Create payment intent for booking
router.post("/create/:bookingId", authenticateToken, async (req, res) => {
    try {
      const { bookingId } = req.params
  
      const booking = await Booking.findById(bookingId).populate("car")
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" })
      }
  
      // Check if booking belongs to user
      if (booking.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" })
      }
  
      // Check if booking is already paid
      if (booking.paymentStatus === "paid") {
        return res.status(400).json({ message: "Booking is already paid" })
      }
    }
      catch (error) {
        res.status(500).json({ message: error.message })
      }
    })

    // Send confirmation
    router.post("/confirm/:bookingId", authenticateToken, async (req, res) => {
        try {
            res.json({
                message: "Payment successful",
                booking,
                payment,
              })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
module.exports = router    
