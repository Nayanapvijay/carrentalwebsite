import api from "./api"

export const carService = {
  // Get all cars with optional filters
  getCars: async (params = {}) => {
   
      return await api.get("/cars", { params })
    
  },

  // Get featured cars
  getFeaturedCars: async () => {
    
      return await api.get("/cars/featured")
   
  },

  // Get car by ID
  getCarById: async (id) => {
   
      return await api.get(`/cars/${id}`)
   
  },

  // Search cars
  searchCars: async (searchTerm) => {
    
      return await api.get("/cars/search", { params: { q: searchTerm } })
  
  },

  // Get car categories
  getCategories: async () => {
    
      return await api.get("/cars/categories")
 
  },
}

export default carService

