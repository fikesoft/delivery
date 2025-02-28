import chefPhoto from "../../assets/img/chefI.svg"
import { MetaBalls } from "../../components/metaBalls"
import { Logo } from "../../components/logo"
import { FormRow } from "../../components/formRow"
import { FormBtn } from "../../components/formBtn"
import { useState } from "react"
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { Link } from "react-router-dom"

const Register = () => {
  const [login,setLogin] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassowrd] = useState("");
  const [repeatedPassowrd,setRepeatedPassword] = useState("");
  const handleOnRegister= () => {

  }
  return (
   <div className="auth-page">
      <img src={chefPhoto} alt="photo" className="bgphoto"/>
      <div className="auth-container">
          <MetaBalls
            color="#FED892"
            cursorBallColor="#FED892"
            cursorBallSize={5}
            ballCount={30}
            animationSize={30}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1}
            speed={0.3}
          />
          <Logo/>
        <form className="login-container-form">
          <div className="input-container">
            <FormRow
              placeHolderText="Enter your username"
              labelText="Username:"
              typeInput="text"
              value={username}
              handleOnChange={(e)=>setUsername(e.target.value)}
            />
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
              handleOnChange={(e)=>setPassowrd(e.target.value)}
              iconOpenEye={RxEyeOpen}
              iconClosedEye={GoEyeClosed}
            />
            <FormRow
              placeHolderText="Repeat your passowrd"
              labelText="Repeat your password:"
              typeInput="password"
              value={repeatedPassowrd}
              handleOnChange={(e)=>setRepeatedPassword(e.target.value)}
              iconOpenEye={RxEyeOpen}
              iconClosedEye={GoEyeClosed}
            />
             
          </div>
            <div className="button-container">
              <FormBtn 
                text="Register Account"
                type="submit"
                handleOnClick={handleOnRegister}
              />
              <p>Have an account already? <span><Link to="/login">Login</Link> </span> </p>
            </div>
        </form>
      </div>
   </div>
  )
}

export default Register