import { useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "../../components/logo"
import { FormRow } from "../../components/formRow"
import { FormBtn } from "../../components/formBtn"
import { MetaBalls } from "../../components/metaBalls"
import chefPhoto from "../../assets/img/chefI.svg"

const handleSubmitForm = ()=>{ 

}
const Login = () => {
  const [login, setLogin ] = useState("");
  const[password,setPassword] = useState("")
  
  return (
      <div className="auth-page">
        <img src={chefPhoto} alt="photo" className="bgphoto"/>
        <div className="auth-container">
            <MetaBalls
            color="#FED892"
            cursorBallColor="#FED892"
            cursorBallSize={5}
            ballCount={30}
            animationSize={25}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1}
            speed={0.5}
          />
            <Logo/>
          <form className="login-container-form">
            <div className="input-container">
              <FormRow  
                placeHolderText="Enter your login"
                labelText="Login:"
                typeInput="text"
                value={login}
                handleOnChange={(e)=>setLogin(e.target.value)}
              />
              <FormRow  
                placeHolderText="Enter your password"
                labelText="Password:"
                typeInput="password"
                value={password}
                handleOnChange={(e)=>setPassword(e.target.value)}
              />                    
            </div>
            <div className="button-container">
              <FormBtn 
                text="Acces your account"
                type="submit"
                handleOnClick={handleSubmitForm}
              />
              <p>Don't you have an account <span><Link to="/register">Register</Link> </span> </p>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login