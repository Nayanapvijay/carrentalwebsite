

import { createContext, useState, useEffect, useContext } from "react"
import { authAPI } from "../utils/api"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setCurrentUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)

      if (response.success) {
        setToken(response.token)
        setCurrentUser(response.user)

        // Save to localStorage
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))

        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Login user
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)

      if (response.success) {
        setToken(response.token)
        setCurrentUser(response.user)

        // Save to localStorage
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))

        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Logout user
  const logout = () => {
    setToken(null)
    setCurrentUser(null)

    // Remove from localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData)

      if (response.success) {
        const updatedUser = { ...currentUser, ...response.data }
        setCurrentUser(updatedUser)

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser))

        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    currentUser,
    token,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!token,
    isAdmin: currentUser?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

