import { Link } from 'react-router-dom'
import bg404 from "../../assets/img/bg404.svg"
const NotFound = () => {
  return (
    <div className='error'>
      <h1>404</h1>
      <p>You tried to find our pizza recipe but its not here please go back <span><Link to="/login">Home</Link></span></p>
      <img src={bg404} alt='photo error'/>
    </div>
  )
}

export default NotFound