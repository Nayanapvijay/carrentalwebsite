"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, Users, Fuel, Gauge, Star, ArrowLeft } from "lucide-react"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { carAPI } from "../../utils/api"
import LoadingSpinner from "../common/LoadingSpinner"
import ImageGallery from "./ImageGallery"

const CarDetail = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        const response = await carAPI.getCarById(id)
        setCar(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load car details",err)
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error || "Car not found"}</div>
        <div className="mt-4 text-center">
          <Button asChild>
            <Link to="/cars">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cars
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/cars">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cars
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
          <div className="flex items-center mb-4">
            <Badge>{car.category}</Badge>
            <div className="ml-4 flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span>{car.rating || 4.5}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery images={car.images} carName={car.name} />

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{car.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {car.features && car.features.length > 0 ? (
                car.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <span>{feature}</span>
                  </div>
                ))
              ) : (
                <p>No features listed</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="text-center mb-4">
              <span className="text-3xl font-bold">${car.price}</span>
              <span className="text-gray-500">/day</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col items-center p-3 bg-white rounded-md">
                <Users className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{car.seats} Seats</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white rounded-md">
                <Fuel className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{car.fuelType}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white rounded-md">
                <Gauge className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{car.mileage}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white rounded-md">
                <Calendar className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{car.year}</span>
              </div>
            </div>

            <Button className="w-full mb-4" asChild>
              <Link to={`/booking/${car._id}`}>Book Now</Link>
            </Button>

            <div className="text-sm text-gray-500 text-center">
              {car.available ? "Available for rent" : "Currently unavailable"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
