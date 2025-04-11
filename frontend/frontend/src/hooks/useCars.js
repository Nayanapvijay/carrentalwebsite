"use client"

import { useState, useEffect, useCallback } from "react"
import carService from "../pages/services/carService"

export const useCars = (initialFilters = {}) => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialFilters)

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await carService.getCars(filters)
      setCars(response.data || [])
    } catch (err) {
      setError(err.message || "Failed to fetch cars")
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  return {
    cars,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    refetch: fetchCars,
  }
}

