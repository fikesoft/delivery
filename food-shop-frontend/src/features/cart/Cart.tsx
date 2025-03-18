import React from 'react'
import { useCart } from "../../context/CartContext";
import EmptyCart from '../../components/emptyCart/EmptyCart';
import { MdDeleteOutline, MdKeyboardArrowLeft } from "react-icons/md";
import { IoCartOutline } from 'react-icons/io5';
import { RxCrossCircled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
const Cart = () => {
  const { cartItems, removeFromCart, total ,clearCart} = useCart();
  const navigate = useNavigate();
  return (
    <div className="full-cart">
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {/* Header */}
          <div className="header-content">
            <h1 className="title">
              <IoCartOutline /> Cart items
            </h1>
            <div className="delete-all" onClick={()=>{clearCart() , toast.success("Deleted successfully")}}>
              <MdDeleteOutline />
              <p className="text">Delete all</p>
            </div>
          </div>

          {/* Cart Items List */}
          <ul className="items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-content">
                  <img src={item.img} alt={item.name} className="cart-img" />
                  <div className="description">
                    <h3>{item.name}</h3>
                    <div className="selected-data">
                      <p>{item.pizzaSize}cm,</p>
                      <p>{item.pizzaDough}</p>
                    </div>
                  </div>
                </div>
                <div className="pizza-data">
                  <p>{item.quantity}</p>
                  <p>{item.price.toFixed(2)}$</p>
                </div>
                <button onClick={() => {
                  removeFromCart(item.id!) 
                  toast.success("Successfully deleted the item")}}>
                  <RxCrossCircled />
                </button>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <div className="info-cart">
            <p className="pizza-count">Total pizzas: {cartItems.length} pcs.</p>
            <p className="pizza-total">
              Order amount: <span>{total.toFixed(2)}$</span>
            </p>
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="go-home" onClick={()=>{navigate("/")}}>
              <MdKeyboardArrowLeft className='icon'  />
              Go back
            </button>
            <button className="buy" onClick={()=>{clearCart() ,navigate("/")}} >Buy now</button>
          </div>
        </div>
      ) : (
        <EmptyCart/>
      )}
    </div>

  )
}

export default Cart