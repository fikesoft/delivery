import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
interface ProtectedRouteProps{
    requiredRole?: "admin" | "user";
}

const ProtectedRoutes: React.FC<ProtectedRouteProps>  = ({requiredRole}) => {
    const { auth } = useAuth();

    // If the user is not authenticated, redirect to login
    if (!auth.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    // If admin is required and the user is not an admin, redirect to a safe route
    if (requiredRole === "admin" && !auth.isAdmin) {
      return <Navigate to="/" replace />;
    }
  
    // Otherwise, render the nested routes
    return <Outlet />;
}

export default ProtectedRoutes