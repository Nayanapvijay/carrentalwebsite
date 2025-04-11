// Application constants
export const APP_NAME = "DrivEase"
export const APP_DESCRIPTION = "Car Rental Service"

// API endpoints
export const API_BASE_URL =  "http://localhost:5000/api"

// User roles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
}

// Booking statuses
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
}

// Car categories
export const CAR_CATEGORIES = ["Economy", "Compact", "SUV", "Luxury", "Sports", "Van"]

// Fuel types
export const FUEL_TYPES = ["Gasoline", "Diesel", "Hybrid", "Electric"]

// Transmission types
export const TRANSMISSION_TYPES = ["Automatic", "Manual"]

// Pagination
export const ITEMS_PER_PAGE = 12

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: "Please enter a valid email address",
  PASSWORD: "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number",
  PASSWORDS_MATCH: "Passwords do not match",
  PHONE: "Please enter a valid phone number",
  MIN_LENGTH: (length) => `Must be at least ${length} characters`,
  MAX_LENGTH: (length) => `Must be at most ${length} characters`,
  TERMS: "You must agree to the terms and conditions",
}

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
}

// Theme options
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  API: "yyyy-MM-dd",
}

