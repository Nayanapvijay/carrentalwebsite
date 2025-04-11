import { createContext, useState, useEffect, useContext } from "react"
import { authAPI } from "../utils/api"

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Register
  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData)
      if (res.token) {
        setToken(res.token)
        setCurrentUser(res.user)
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", JSON.stringify(res.user))
        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Login
  const login = async (credentials) => {
    try {
      const res = await authAPI.login(credentials)
      if (res.token) {
        setToken(res.token)
        setCurrentUser(res.user)
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", JSON.stringify(res.user))
        return { success: true }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Logout
  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      const res = await authAPI.updateProfile(profileData)
      if (res.data) {
        const updatedUser = { ...currentUser, ...res.data }
        setCurrentUser(updatedUser)
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
