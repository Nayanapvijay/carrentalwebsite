"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { CarFront, Users, Fuel, Gauge, Check, Shield, Star, ArrowLeft } from "lucide-react"
//import MainLayout from "../../components/layout/MainLayout"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs"
import { Separator } from "../../components/ui/Seperator"
import DateRangePicker from "../../components/DateRangePicker"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { useAuth } from "../../hooks/useAuth"
import carService from "../services/carService"
import { formatCurrency, calculateDuration } from "../../utils/formatters"

const CarDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
  })

  const [priceDetails, setPriceDetails] = useState({
    dailyRate: 0,
    days: 5,
    subtotal: 0,
    serviceFee: 0,
    insurance: 0,
    total: 0,
  })

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true)
        const response = await carService.getCarById(id)
        setCar(response)

        // Set initial price details
        const days = calculateDuration(dateRange.startDate, dateRange.endDate)
        const subtotal = response.price * days
        const serviceFee = Math.round(subtotal * 0.1) // 10% service fee
        const insurance = 35 // Fixed insurance fee

        setPriceDetails({
          dailyRate: response.price,
          days,
          subtotal,
          serviceFee,
          insurance,
          total: subtotal + serviceFee + insurance,
        })

        setLoading(false)
      } catch (err) {
        setError("Failed to load car details",err)
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [id])

  // Update price when date range changes
  useEffect(() => {
    if (car) {
      const days = calculateDuration(dateRange.startDate, dateRange.endDate)
      const subtotal = car.price * days
      const serviceFee = Math.round(subtotal * 0.1) // 10% service fee
      const insurance = 35 // Fixed insurance fee

      setPriceDetails({
        dailyRate: car.price,
        days,
        subtotal,
        serviceFee,
        insurance,
        total: subtotal + serviceFee + insurance,
      })
    }
  }, [dateRange, car])

  const handleDateChange = (range) => {
    setDateRange(range)
  }

  const handleReserve = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/cars/${id}` } })
      return
    }

    navigate(`/booking/${id}`, {
      state: {
        dateRange,
        priceDetails,
      },
    })
  }

  if (loading) {
    return (
      
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex justify-center items-center min-h-[60vh]">
            <LoadingSpinner />
          </div>
        </div>
      
    )
  }

  if (error || !car) {
    return (
      
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Error Loading Car Details</h2>
            <p className="text-muted-foreground mb-6">{error || "Car not found"}</p>
            <Button asChild>
              <Link to="/cars">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cars
              </Link>
            </Button>
          </div>
        </div>
      
    )
  }

  return (
    
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <Link to="/cars" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to cars
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={car.images[activeImage] || "/placeholder.svg?height=400&width=600"}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {car.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${activeImage === index ? "border-primary" : "border-transparent"}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={image || "/placeholder.svg?height=150&width=200"}
                        alt={`${car.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-3xl font-bold">{car.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm font-medium">{car.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({car.reviews || 0} reviews)</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{car.category}</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(car.price)}{" "}
                    <span className="text-base font-normal text-muted-foreground">/day</span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
                  <div className="flex flex-col items-center text-center p-3 bg-muted rounded-lg">
                    <Users className="h-5 w-5 mb-1" />
                    <span className="text-sm font-medium">{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-muted rounded-lg">
                    <Fuel className="h-5 w-5 mb-1" />
                    <span className="text-sm font-medium">{car.fuelType}</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-muted rounded-lg">
                    <Gauge className="h-5 w-5 mb-1" />
                    <span className="text-sm font-medium">{car.mileage}</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-muted rounded-lg">
                    <CarFront className="h-5 w-5 mb-1" />
                    <span className="text-sm font-medium">{car.transmission}</span>
                  </div>
                </div>

                <Tabs defaultValue="description" className="mt-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-6">
                    <div className="prose max-w-none">
                      <p>{car.description}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {car.features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 fill-primary text-primary" />
                          <span className="ml-1 text-lg font-bold">{car.rating}</span>
                        </div>
                        <span className="text-muted-foreground">Based on {car.reviews || 0} reviews</span>
                      </div>

                      <div className="space-y-4">
                        {/* Sample reviews - in a real app, these would be fetched from an API */}
                        {[1, 2, 3].map((review) => (
                          <div key={review} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                  <span className="font-medium">JD</span>
                                </div>
                                <div>
                                  <div className="font-medium">John Doe</div>
                                  <div className="text-sm text-muted-foreground">October 2023</div>
                                </div>
                              </div>
                              <div className="flex">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted"}`}
                                    />
                                  ))}
                              </div>
                            </div>
                            <p className="mt-2 text-sm">
                              Great car! Very clean and drove perfectly. The pickup and drop-off process was smooth and
                              easy.
                            </p>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full">
                        Load More Reviews
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Book this car</h2>
                <div className="space-y-4">
                  <DateRangePicker className="w-full" value={dateRange} onChange={handleDateChange} />

                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between">
                      <span>
                        {formatCurrency(car.price)} x {priceDetails.days} days
                      </span>
                      <span>{formatCurrency(priceDetails.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>{formatCurrency(priceDetails.serviceFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance</span>
                      <span>{formatCurrency(priceDetails.insurance)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(priceDetails.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0 flex flex-col gap-4">
                <Button className="w-full" onClick={handleReserve}>
                  Reserve Now
                </Button>
                <div className="text-center text-sm text-muted-foreground">You won't be charged yet</div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    
  )
}

export default CarDetailsPage

