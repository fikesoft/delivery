import { Logo } from "../logo";
import { IoIosExit } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate  ,NavLink} from "react-router-dom";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  // Function to handle logout and navigation
  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="admin-navbar">
      {/* Logo */}
      <Logo />

      {/* Navbar Links */}
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <NavLink  to="/admin"  end >
            Dashboard
        </NavLink>
        <NavLink  to="/admin/users"  end >
            Users
        </NavLink>
        <NavLink  to="/admin/pizza-crud"  end >
            Crud
        </NavLink>
        {/* Conditionally render Exit link in the dropdown */}
        {isMenuOpen && (
          <li onClick={handleLogout}>
            <a href="#">
              Exit <IoIosExit className="admin-exit-sm" style={{ color: "#FFFFFF" }} />
            </a>
          </li>
        )}
      </ul>

      {/* Exit Icon (Visible on Large Screens) */}
      <IoIosExit 
        className="admin-exit" 
        onClick={handleLogout} // Use the handleLogout function
      />

      {/* Burger Menu Icon (Visible on Small Screens) */}
      <HiOutlineBars3 
        className="burger-menu" 
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
      />
    </nav>
  );
};

export default AdminNavbar;