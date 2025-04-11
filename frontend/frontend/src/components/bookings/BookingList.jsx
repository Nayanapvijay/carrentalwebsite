"use client"
import { Link } from "react-router-dom"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Badge } from "../ui/Badge"
//import LoadingSpinner from "../common/LoadingSpinner"
import { formatDate, formatCurrency, calculateDuration } from "../../utils/formatters"
import { useBookings } from "../../hooks/useBookings"

const BookingList = ({ bookings = [], loading = false, error = null }) => {
  const { cancelBooking } = useBookings()

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await cancelBooking(bookingId)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No bookings found</h3>
        <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
        <Button asChild>
          <Link to="/cars">Browse Cars</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking._id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking.car.name}</CardTitle>
                <div className="text-sm text-muted-foreground">{booking.car.category}</div>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(booking.status)}
                  <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                </div>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <div>
                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                  </div>
                  <div className="text-muted-foreground">
                    {calculateDuration(booking.startDate, booking.endDate)} days
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{formatCurrency(booking.totalAmount)}</div>
                <div className="text-sm text-muted-foreground">Total amount</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/bookings/${booking._id}`}>View Details</Link>
            </Button>
            {booking.status === "pending" || booking.status === "confirmed" ? (
              <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking._id)}>
                Cancel Booking
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default BookingList
