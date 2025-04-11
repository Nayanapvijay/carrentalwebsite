

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CarFront, Search, MapPin, Star, Users, Fuel, Gauge } from "lucide-react"
import { carAPI } from "../utils/api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import DateRangePicker from "../components/DateRangePicker"


function HomePage() {
  const [featuredCars, setFeaturedCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        setLoading(true)
        const response = await carAPI.getFeaturedCars()
        setFeaturedCars(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load featured cars",err)
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [])



  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find Your Perfect Ride
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Rent the car of your dreams with our easy booking process. Affordable rates, flexible pickup and
                    return options.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to="/cars"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Browse Cars
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Book Your Car</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              <option value="" disabled selected>
                                Pickup Location
                              </option>
                              <option value="Kozhikode">Kozhikode</option>
                              <option value="Malappuram">Malappuram</option>
                              <option value="Palakkad">Palakkad</option>
                              <option value="Wayanad">Wayanad</option>
                            </select>
                          </div>
                          <DateRangePicker />
                          <div className="flex items-center space-x-2">
                            <CarFront className="h-4 w-4 text-muted-foreground" />
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              <option value="" disabled selected>
                                Car Type
                              </option>
                              <option value="economy">Economy</option>
                              <option value="compact">Compact</option>
                              <option value="suv">SUV</option>
                              <option value="luxury">Luxury</option>
                            </select>
                          </div>
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                          <Search className="mr-2 h-4 w-4" /> Search Cars
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
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

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 mt-8">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {featuredCars.map((car) => (
                  <div
                    key={car._id}
                    className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={car.images[0] || "/placeholder.jpg"}
                        alt={car.name}
                        className="w-full object-cover h-[200px]"
                      />
                      {car.featured && (
                        <span className="absolute top-2 right-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{car.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                          <span className="text-sm font-medium">{car.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{car.category}</div>
                    </div>
                    <div className="p-4 pt-0">
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
                    </div>
                    <div className="p-4 flex justify-between items-center border-t">
                      <div>
                        <span className="text-2xl font-bold">${car.price}</span>
                        <span className="text-muted-foreground">/day</span>
                      </div>
                      <Link
                        to={`/cars/${car._id}`}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        Rent Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <Link
                to="/cars"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                View All Cars
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Renting a car with DrivEase is simple and straightforward. Follow these easy steps:
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  icon: <Search className="h-10 w-10 text-primary" />,
                  title: "Search",
                  description: "Browse our extensive collection of vehicles and choose the perfect car for your needs.",
                },
                {
                  icon: <CarFront className="h-10 w-10 text-primary" />,
                  title: "Book & Pay",
                  description:
                    "Select your dates, choose optional extras, and complete your booking with our secure payment system.",
                },
                {
                  icon: <CarFront className="h-10 w-10 text-primary" />,
                  title: "Pick Up",
                  description:
                    "Collect your car from one of our convenient locations with our quick and easy pick-up process.",
                },
                {
                  icon: <CarFront className="h-10 w-10 text-primary" />,
                  title: "Enjoy & Return",
                  description: "Enjoy your journey and return the car at the designated location when you're done.",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">{step.icon}</div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Hit the Road?</h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                  Join thousands of satisfied customers who choose DrivEase for their car rental needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  to="/cars"
                  className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-white/90"
                >
                  Browse Cars
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground bg-transparent px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

