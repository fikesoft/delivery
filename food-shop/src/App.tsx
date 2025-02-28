import { createBrowserRouter,RouterProvider} from "react-router-dom"
import {Login,Register} from "./features/auth"
import { Home } from "./features/home"
import MainLayout from "./layouts/MainLayout"
import { ProtectedRoute } from "./routes"
import "./assets/style/reset.css";
import "./assets/style/index.css";
const route =createBrowserRouter([
   //Login && Register 
   {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  //These are protected 
  { 
    path:"/",
    element:<ProtectedRoute/>,
    children:[
      {
        element:<MainLayout/>,
        //Sould be error
        children:[
          {
            index:true,
            element:<Home/>
          },
        ]
      }
    ]
    
  }
])
function App() {
  return (
    <RouterProvider router={route}/>
  )
}

export default App
