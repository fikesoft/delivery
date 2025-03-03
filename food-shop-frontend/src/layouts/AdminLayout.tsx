import { Outlet } from "react-router-dom"
import { AdminNavbar } from "../components/adminNavbar"
const AdminLayout = () => {
  return (
    <div className="admin-layout">
        <header>
            <AdminNavbar/>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminLayout