import { Link } from "react-router-dom"
import { Star, Users, Fuel, Gauge } from "lucide-react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Badge } from "../ui/Badge"

const CarCard = ({ car }) => {
  // Function to get the primary image or fallback
  const getCarImage = () => {
    if (car.images && car.images.length > 0) {
      return car.images[0]
    }
    return "/placeholder.svg?height=200&width=300"
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img
          src={getCarImage() || "/placeholder.svg"}
          alt={car.name}
          className="w-full object-cover h-[200px]"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg?height=200&width=300"
          }}
        />
        {car.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{car.name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
            <span className="text-sm font-medium">{car.rating || 4.5}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">{car.category}</div>
      </CardHeader>
      <CardContent className="flex-grow">
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
  )
}

export default CarCard
