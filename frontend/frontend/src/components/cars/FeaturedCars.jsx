import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Fuel, Gauge } from "lucide-react"

export default function FeaturedCars() {
  const featuredCars = [
    {
      id: 1,
      name: "Tesla Model 3",
      category: "Electric",
      price: 89,
      image: "https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984_1280.png?height=200&width=300&text=Tesla+Model+3",
      rating: 4.9,
      seats: 5,
      fuelType: "Electric",
      mileage: "Unlimited",
    },
    {
      id: 2,
      name: "BMW 3 Series",
      category: "Luxury",
      price: 75,
      image: "https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984_1280.png?height=200&width=300&text=BMW+3+Series",
      rating: 4.7,
      seats: 5,
      fuelType: "Gasoline",
      mileage: "250 mi/day",
    },
    {
      id: 3,
      name: "Toyota RAV4",
      category: "SUV",
      price: 65,
      image: "https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984_1280.png?height=200&width=300&text=Toyota+RAV4",
      rating: 4.8,
      seats: 5,
      fuelType: "Hybrid",
      mileage: "300 mi/day",
    },
    {
      id: 4,
      name: "Mercedes-Benz E-Class",
      category: "Luxury",
      price: 95,
      image: "https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984_1280.png?height=200&width=300&text=Mercedes-Benz+E-Class",
      rating: 4.9,
      seats: 5,
      fuelType: "Gasoline",
      mileage: "200 mi/day",
    },
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Cars</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our selection of premium vehicles available for rent
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative h-48 bg-slate-200">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">{car.category}</Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{car.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-4 w-4 text-slate-400" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1 col-span-2">
                    <Gauge className="h-4 w-4 text-slate-400" />
                    <span>{car.mileage}</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold">${car.price}</span>
                    <span className="text-slate-500 text-sm"> /day</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/cars/${car.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/cars">View All Cars</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
