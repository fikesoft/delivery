import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Logo } from "../logo";
import { IoIosExit } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MainNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { cartItems, total ,clearCart, } = useCart();

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/login");
  };

  const handleNavigationCart = () => {
    navigate("/cart");
  };

  return (
    <div className="main-navbar">
      <Logo />
      <div className="main-navbar-actions">
        <div className="button-cart" onClick={handleNavigationCart}>
          <p className="cart-price">{total} $</p>
          <p>|</p>
          <div className="number-order">
            <IoCartOutline className="cart" />
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
        </div>
        <button className="button-exit" onClick={handleLogout}>
          <IoIosExit className="admin-exit" />
          Exit
        </button>
      </div>
    </div>
  );
};

export default MainNavbar;
