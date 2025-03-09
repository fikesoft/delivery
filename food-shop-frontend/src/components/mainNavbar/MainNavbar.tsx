import { useAuth } from '../../context/AuthContext';
import { Logo } from '../logo'
import { IoIosExit } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";

const MainNavbar = () => {
    const navigate = useNavigate ();
    const { logout } = useAuth();
    const handleLogout = () => {
      logout(); 
      navigate("/login"); 
    };
    return (
    <div className='main-navbar'>
        <Logo/>
        <div className='main-navbar-actions'>
            <div className='button-cart'>
                <p className='cart-price'>{520} $</p>
                <p>|</p>
                <div className='number-order'>
                    <IoCartOutline className='cart'/>
                    <p className='number-of-order'>{3}</p>
                </div>
                
            </div>
            <button className='button-exit' onClick={handleLogout}>
                <IoIosExit className="admin-exit" />
                Exit
            </button>            
            
        </div>
    </div>
  )
}

export default MainNavbar   