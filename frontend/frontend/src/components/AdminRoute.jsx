
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated && isAdmin ? children : <Navigate to="/login" />
}

export default AdminRoute

