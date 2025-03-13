import React from 'react'
import { useNavigate } from 'react-router-dom'
const EmptyCart = () => {
    const navigate = useNavigate();
    return (
    <div className='empty-cart'>
        <div className='content'>
            <h1 className='title'>Your cart is empty😕</h1>
            <p className='text'>Probably, you didn't order pizza yet.
            To order a pizza, go to the main page. </p>
        </div>
        <button className='go-home' onClick={()=>{navigate("/")}}>Go back</button>
    </div>
  )
}

export default EmptyCart