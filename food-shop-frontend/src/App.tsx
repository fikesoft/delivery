import { createBrowserRouter,RouterProvider} from "react-router-dom"
import {Login,Register} from "./features/auth"
import { Home } from "./features/home"
import { Admin } from "./features/admin"
import MainLayout from "./layouts/MainLayout"
import { ProtectedRoute } from "./routes"
import { AuthProvider } from "./context/AuthContext"
import "./assets/style/reset.css";
import "./assets/style/index.css";
const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // For authenticated users
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "admin",
        element: <ProtectedRoute requiredRole="admin" />, // Only for admin
        children: [
          {
            index: true,
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App
