import { createBrowserRouter,RouterProvider} from "react-router-dom"
import {Login,Register} from "./features/auth"
import { Home } from "./features/home"
import { Cart } from "./features/cart"
import { Admin,Users,CreatePizza,UpdatePizza,ReadPizza} from "./features/admin"
import NotFound from "./components/error/NotFound"
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import CrudLayout from "./layouts/CrudLayout"
import { ProtectedRoute } from "./routes"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
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
          {
            path:"cart",
            element:<Cart/>
          }
        ],
      },
      {
        path: "admin",
        element: <ProtectedRoute requiredRole="admin" />, // Only for admin
        children: [
          {
            element: <AdminLayout/>, 
            children:[
              {
                index: true,
                element: <Admin />, // Default admin page
              },
              {
                path:"users",
                element:<Users/>
              },
              {
                path:"pizza-crud",
                element:<CrudLayout/>,
                children:[
                    {
                      index:true,
                    },
                    {
                      path:"create",
                      element:<CreatePizza/>
                    },
                    {
                      path:"read",
                      element:<ReadPizza/>
                    },
                    {
                      path:"update",
                      element:<UpdatePizza/>
                    },
                    
                ]
              }
            ]
          },
        ],
      },
    ],
  },
  {
    path:"*",
    element: <NotFound/>
  }
]);
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={routes} />
      </CartProvider> 
    </AuthProvider>
  )
}

export default App
