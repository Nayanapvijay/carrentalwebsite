
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute

