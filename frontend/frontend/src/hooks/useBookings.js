"use client"

import { useState, useEffect, useCallback } from "react"
import bookingService from "../pages/services/bookingService"

export const useBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await bookingService.getUserBookings()
      setBookings(response.data || [])
    } catch (err) {
      setError(err.message || "Failed to fetch bookings")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true)
      await bookingService.cancelBooking(bookingId)
      // Update the local state
      setBookings(
        bookings.map((booking) => (booking._id === bookingId ? { ...booking, status: "cancelled" } : booking)),
      )
      return { success: true }
    } catch (err) {
      setError(err.message || "Failed to cancel booking")
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
    cancelBooking,
  }
}

