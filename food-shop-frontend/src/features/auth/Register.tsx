import chefPhoto from "../../assets/img/chefI.svg"
import { MetaBalls } from "../../components/metaBalls"
import { Logo } from "../../components/logo"
import { FormRow } from "../../components/formRow"
import { FormBtn } from "../../components/formBtn"
import { useState } from "react"
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { Link ,useNavigate} from "react-router-dom"
import authApi from "../../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [login,setLogin] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassowrd] = useState("");
  const [repeatedPassowrd,setRepeatedPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [errorPassword,setErrorPassword] = useState("")
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleOnRegister = async (): Promise<void> => {
    setLoading(true);
  
    if (!login || !username || !password || !repeatedPassowrd) {
      toast.warn("All fields are required!", { autoClose: 1000 }); // ✅ autoClose works properly
      setTimeout(() => setLoading(false), 1000);
      return;
    }
  
    if (password !== repeatedPassowrd) {
      setErrorPassword("The passwords do not match");
      toast.warn("The passwords do not match!", { autoClose: 1500 }); // ✅ Called immediately
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      return;
    }
    
    try {
      
      const response = await authApi.registerUser(username,login,password);
      if (!response) {
        toast.error("Unexpected error occurred.");
        return;
      }
      switch (response.status) {
        case 201:
          toast.success(response.data.message || "User registered successfully!");
          setTimeout(() => {
            navigate("/login")  
          }, 2000);
          
          break;
        case 400:
          toast.error(response.data.error || "Bad request. Check your input.");
          break;
        case 404:
          toast.error(response.data.error || "User not found.");
          break;
        case 401:
          toast.warning(response.data.error || "Unauthorized. Check your credentials.");
          break;
        case 500:
          toast.error(response.data.error || "Server error. Try again later.");
          break;
        default:
          toast.info("Something unexpected happened.");
    }
    } catch (error) {
        toast.error('Registration failed. Please try again.')
    } finally {
        setLoading(false);
        setErrorPassword("");
    }
  };
  
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
     
            <ToastContainer className="custom-notification" />
          
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
              errorMessage={errorPassword}
            />
            <FormRow
              placeHolderText="Repeat your passowrd"
              labelText="Repeat your password:"
              typeInput="password"
              value={repeatedPassowrd}
              handleOnChange={(e)=>setRepeatedPassword(e.target.value)}
              iconOpenEye={RxEyeOpen}
              iconClosedEye={GoEyeClosed}
              errorMessage={errorPassword}
            />
             
          </div>
            <div className="button-container">
              <FormBtn 
                text={loading ? "Loading..." : "Register Account"}
                type="submit"
                handleOnClick={handleOnRegister}
                disabledValue={loading}
              />
              <p>Have an account already? <span><Link to="/login">Login</Link> </span> </p>
            </div>
        </form>
      </div>
   </div>
  )
}

export default Register