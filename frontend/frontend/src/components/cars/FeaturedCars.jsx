"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Star, Users, Fuel, Gauge } from "lucide-react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Badge } from "../ui/Badge"
import carService from "../../services/carService"
import LoadingSpinner from "../common/LoadingSpinner"

const FeaturedCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        setLoading(true)
        const response = await carService.getFeaturedCars()
        setCars(response.data || [])
        setLoading(false)
      } catch (err) {
        setError("Failed to load featured cars",err)
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [])

  if (loading) {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Cars</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our selection of premium vehicles for your next adventure.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Cars</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our selection of premium vehicles for your next adventure.
              </p>
            </div>
          </div>
          <div className="text-center text-red-500 mt-8">{error}</div>
        </div>
      </section>
    )
  }

  // Fallback to sample data if no cars are returned
  const displayCars =
    cars.length > 0
      ? cars
      : [
          {
            _id: 1,
            name: "Toyota Camry",
            category: "Sedan",
            price: 45,
            images: ["/placeholder.svg?height=200&width=300"],
            rating: 4.8,
            seats: 5,
            fuelType: "Hybrid",
            mileage: "Unlimited",
            featured: true,
          },
          {
            _id: 2,
            name: "Honda CR-V",
            category: "SUV",
            price: 65,
            images: ["/placeholder.svg?height=200&width=300"],
            rating: 4.7,
            seats: 5,
            fuelType: "Gasoline",
            mileage: "Unlimited",
            featured: false,
          },
          {
            _id: 3,
            name: "BMW 3 Series",
            category: "Luxury",
            price: 95,
            images: ["/placeholder.svg?height=200&width=300"],
            rating: 4.9,
            seats: 5,
            fuelType: "Gasoline",
            mileage: "Unlimited",
            featured: false,
          },
          {
            _id: 4,
            name: "Tesla Model 3",
            category: "Electric",
            price: 85,
            images: ["/placeholder.svg?height=200&width=300"],
            rating: 4.9,
            seats: 5,
            fuelType: "Electric",
            mileage: "Unlimited",
            featured: true,
          },
        ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Cars</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Explore our selection of premium vehicles for your next adventure.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {displayCars.map((car) => (
            <Card key={car._id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={car.images[0] || "/placeholder.svg?height=200&width=300"}
                  alt={car.name}
                  className="w-full object-cover h-[200px]"
                />
                {car.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{car.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{car.category}</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex flex-col items-center">
                    <Users className="h-4 w-4 mb-1" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Fuel className="h-4 w-4 mb-1" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Gauge className="h-4 w-4 mb-1" />
                    <span>{car.mileage}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">${car.price}</span>
                  <span className="text-muted-foreground">/day</span>
                </div>
                <Button asChild>
                  <Link to={`/cars/${car._id}`}>Rent Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link to="/cars">View All Cars</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars

