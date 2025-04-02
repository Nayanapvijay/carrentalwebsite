const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
require("dotenv").config();
const userRoutes = require ('./routes/user.js')
const carRoutes = require('./routes/cars.js')
const bookingRoutes = require('./routes/bookings.js')
const paymentRoutes = require('./routes/payments')
const adminRoutes = require('./routes/admin.js')


//dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))


  app.use("/api/users", userRoutes)
  app.use("/api/cars", carRoutes)
  app.use("/api/bookings", bookingRoutes)
  app.use("/api/payments", paymentRoutes)
  app.use("/api/admin", adminRoutes)

  app.get("/", (req, res) => {
    res.send("Car Rental API is running")
  })


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  