import { createBrowserRouter,RouterProvider} from "react-router-dom"
import {Login,Register} from "./features/auth"
import { Home } from "./features/home"
import { Admin,Users,CreatePizza,UpdatePizza,ReadPizza,DeletePizza} from "./features/admin"
import NotFound from "./components/error/NotFound"
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import CrudLayout from "./layouts/CrudLayout"
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
                    {
                      path:"delete",
                      element:<DeletePizza/>
                    }
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
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App
