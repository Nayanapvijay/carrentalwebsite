import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import CarDetailsPage from "./pages/cars/CarDetailsPage";
import CarsPage from "./pages/cars/CarsPage";
import ContactPage from "./pages/ContactPage";
import AdminCarFormPage from "./pages/admin/CarFormPage";
import AdminRoutes from "./components/AdminRoute";
import ProfilePage from "./pages/user/ProfilePage";
import PrivateRoutes from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Admin Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/cars/new" element={<AdminCarFormPage />} />
            <Route path="/admin/cars/edit/:id" element={<AdminCarFormPage />} />
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
