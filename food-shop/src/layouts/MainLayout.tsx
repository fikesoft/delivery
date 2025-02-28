import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
        <header>
            Navbar
        </header>
        <main>
            <Outlet/>
        </main>
    </>
  )
}

export default MainLayout