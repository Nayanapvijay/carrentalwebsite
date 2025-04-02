const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const {authenticateToken,isAdmin} = require("../middleware/auth");

const router = express.Router();


// Get all users
router.get("/users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete a user
router.delete("/users/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});


// Get all reservations
router.get("/bookings", authenticateToken, isAdmin, async (req, res) => {
  try {
    const reservations = await Booking.find().populate("car user");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// Approve a reservation
router.put("/bookings/:id/approve", authenticateToken, isAdmin, async (req, res) => {
  try {
    const reservation = await Booking.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Booking not found." });

    reservation.status = "confirmed";
    await reservation.save();
    res.json({ message: "Booking approved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error approving booking" });
  }
});

// Cancel a reservation
router.delete("/bookings/:id/cancel", authenticateToken, isAdmin, async (req, res) => {
  try {
    const reservation = await Booking.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Booking not found." });

    reservation.status = "cancelled";
    await reservation.save();
    res.json({ message: "Booking cancelled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});


// Get all cars
router.get("/cars", authenticateToken, isAdmin, async (req, res) => {
  try {
    const vehicles = await Car.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// Add a new car
router.post("/cars", authenticateToken, isAdmin, async (req, res) => {
  const { name, category, price, image, seats, transmission,fuelType, features, description, available  } = req.body;

  try {
    const newVehicle = new Car({ name, category, price, image, seats, transmission,fuelType, features, description, available  });
    await newVehicle.save();
    res.status(201).json({ message: "Car added successfully", vehicle: newVehicle });
  } catch (error) {
    res.status(500).json({ message: "Error adding car" });
  }
});

// Update vehicle details
router.put("/cars/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const updatedVehicle = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Car updated successfully", vehicle: updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: "Error updating car" });
  }
});

// Delete a car
router.delete("/cars/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting car" });
  }
});

module.exports = router;
