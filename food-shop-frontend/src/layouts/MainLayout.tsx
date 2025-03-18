import { Outlet } from "react-router-dom"
import MainNavbar from "../components/mainNavbar/MainNavbar"
import { ToastContainer } from "react-toastify"
const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="main-layout-inner">
        <header>
            <MainNavbar/>
        </header>
        <main className="main-layout-content">
          {/* This is where child routes will render */}
          <ToastContainer/>
            <Outlet/>
        </main>
      </div> 
    </div>
  )
}

export default MainLayout