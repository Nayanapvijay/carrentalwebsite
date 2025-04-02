// API utility to connect with the backend

const API_URL = "http://localhost:5000/api"

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`

  // Get token from localStorage if available
  const token = localStorage.getItem("token")

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  // Add authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Car API functions
export const carAPI = {
  // Get all cars with optional filters
  getCars: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return fetchAPI(`/cars?${queryString}`)
  },

  // Get featured cars
  getFeaturedCars: () => fetchAPI("/cars/featured"),

  // Get car by ID
  getCarById: (id) => fetchAPI(`/cars/${id}`),
}

// Auth API functions
export const authAPI = {
  // Register new user
  register: (userData) =>
    fetchAPI("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  // Login user
  login: (credentials) =>
    fetchAPI("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  // Get current user profile
  getProfile: () => fetchAPI("/users/profile"),

  // Update user profile
  updateProfile: (profileData) =>
    fetchAPI("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  // Change password
  changePassword: (passwordData) =>
    fetchAPI("/users/change-password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    }),
}

// Booking API functions
export const bookingAPI = {
  // Create new booking
  createBooking: (bookingData) =>
    fetchAPI("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    }),

  // Get user bookings
  getUserBookings: () => fetchAPI("/bookings/user"),

  // Get booking by ID
  getBookingById: (id) => fetchAPI(`/bookings/${id}`),

  // Update booking status
  updateBookingStatus: (id, status) =>
    fetchAPI(`/bookings/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
}

// Admin API functions
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => fetchAPI("/admin/dashboard"),

  // Cars
  getCars: () => fetchAPI("/admin/cars"),
  getCarById: (id) => fetchAPI(`/admin/cars/${id}`),
  createCar: (carData) =>
    fetchAPI("/admin/cars", {
      method: "POST",
      body: JSON.stringify(carData),
    }),
  updateCar: (id, carData) =>
    fetchAPI(`/admin/cars/${id}`, {
      method: "PUT",
      body: JSON.stringify(carData),
    }),
  deleteCar: (id) =>
    fetchAPI(`/admin/cars/${id}`, {
      method: "DELETE",
    }),

  // Bookings
  getBookings: () => fetchAPI("/admin/bookings"),
  getBookingById: (id) => fetchAPI(`/admin/bookings/${id}`),
  updateBookingStatus: (id, status) =>
    fetchAPI(`/admin/bookings/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  // Users
  getUsers: () => fetchAPI("/admin/users"),
  getUserById: (id) => fetchAPI(`/admin/users/${id}`),
  createUser: (userData) =>
    fetchAPI("/admin/users", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  updateUser: (id, userData) =>
    fetchAPI(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    }),
  deleteUser: (id) =>
    fetchAPI(`/admin/users/${id}`, {
      method: "DELETE",
    }),

  // Settings
  getSettings: () => fetchAPI("/admin/settings"),
  updateSettings: (settingsData) =>
    fetchAPI("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settingsData),
    }),
}

