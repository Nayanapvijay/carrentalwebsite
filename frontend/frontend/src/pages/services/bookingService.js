import api from "./api"

const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    // eslint-disable-next-line no-useless-catch
   
      return await api.post("/bookings", bookingData)
   
  },

  // Get user bookings
  getUserBookings: async () => {
    // eslint-disable-next-line no-useless-catch
   
      return await api.get("/bookings/user")
    
  },

  // Get booking by ID
  getBookingById: async (id) => {
    // eslint-disable-next-line no-useless-catch
   
      return await api.get(`/bookings/${id}`)
   
  },

  // Cancel booking
  cancelBooking: async (id) => {
    // eslint-disable-next-line no-useless-catch
   
      return await api.put(`/bookings/${id}/cancel`)
   
  },

  // Check car availability
  checkAvailability: async (carId, startDate, endDate) => {
    // eslint-disable-next-line no-useless-catch
    
      return await api.get("/bookings/check-availability", {
        params: { carId, startDate, endDate },
      })
   
  },

  // Calculate booking price
  calculatePrice: async (carId, startDate, endDate) => {
    // eslint-disable-next-line no-useless-catch
    
      return await api.get("/bookings/calculate-price", {
        params: { carId, startDate, endDate },
      })
   
  },
}

export default bookingService
