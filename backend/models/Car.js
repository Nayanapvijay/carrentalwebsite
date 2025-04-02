const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Economy", "Luxury", "SUV", "Sports"],
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "/placeholder.svg",
    },
    seats: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual"],
    },
    fuelType: {
      type: String,
      required: true,
      default: "Gasoline",
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Car", carSchema)

