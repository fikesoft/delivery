import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
        <header>
            Navbar
        </header>
        <main className="admin-content">
          {/* This is where child routes will render */}
            <Outlet/>
        </main>
    </>
  )
}

export default MainLayout