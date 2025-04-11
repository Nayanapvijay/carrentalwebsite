import { Link } from "react-router-dom"
import { Star, Users, Fuel, Gauge } from "lucide-react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Badge } from "../ui/Badge"
import LoadingSpinner from "../ui/LoadingSpinner"

// const CarList = ({ cars = [], loading = false, error = null }) => {
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner />
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
//   }

//   if (cars.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium mb-2">No cars found</h3>
//         <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {cars.map((car) => (
//         <Card key={car._id} className="overflow-hidden">
//           <div className="relative">
//             <img
//               src={car.images[0] || "/placeholder.svg?height=200&width=300"}
//               alt={car.name}
//               className="w-full object-cover h-[200px]"
//             />
//             {car.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
//           </div>
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle>{car.name}</CardTitle>
//               <div className="flex items-center">
//                 <Star className="h-4 w-4 fill-primary text-primary mr-1" />
//                 <span className="text-sm font-medium">{car.rating}</span>
//               </div>
//             </div>
//             <div className="text-sm text-muted-foreground">{car.category}</div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-2 text-sm">
//               <div className="flex flex-col items-center">
//                 <Users className="h-4 w-4 mb-1" />
//                 <span>{car.seats} seats</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <Fuel className="h-4 w-4 mb-1" />
//                 <span>{car.fuelType}</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <Gauge className="h-4 w-4 mb-1" />
//                 <span>{car.mileage}</span>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between items-center">
//             <div>
//               <span className="text-2xl font-bold">${car.price}</span>
//               <span className="text-muted-foreground">/day</span>
//             </div>
//             <Button asChild>
//               <Link to={`/cars/${car._id}`}>Rent Now</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   )
// }
const CarList = ({ cars, loading, error }) => {
    if (loading) return <p>Loading cars...</p>
    if (error) return <p>Error: {error}</p>
    if (cars.length === 0) return <p>No cars found.</p>
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    )
  }
export default CarList

