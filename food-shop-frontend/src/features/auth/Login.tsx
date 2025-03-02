import { useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "../../components/logo"
import { FormRow } from "../../components/formRow"
import { FormBtn } from "../../components/formBtn"
import { MetaBalls } from "../../components/metaBalls"
import chefPhoto from "../../assets/img/chefI.svg"
import authApi from "../../api";
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const [login, setLogin ] = useState("");
  const[password,setPassword] = useState("")
  const [loading,setLoading] = useState(false);
  const { login: setAuthLogin } = useAuth();
  const navigate = useNavigate()
  
  const handleSubmitForm = async (): Promise<void> => { 
    setLoading(true);
    try {
      const response = await authApi.loginUser(login, password);
      switch (response.status) {
        case 200:
          toast.success(response.data.message || "Login successful!");
          setAuthLogin({ username: response.data.username, isAdmin: response.data.isAdmin });
  
          // Delay navigation slightly for better UX
          setTimeout(() => {
            navigate(response.data.isAdmin ? "/admin" : "/");
          }, 2000); // Navigate after 2 seconds
          break;
        case 400:
          toast.warn(response.data.message || "All fields are required.");
          break;
        case 404:
          toast.error(response.data.message || "User not found.");
          break;
        case 401:
          toast.warning(response.data.message || "Incorrect password.");
          break;
        case 500:
          toast.error(response.data.message || "Server error. Please try again later.");
          break;
        default:
          toast.info("Unexpected response from server.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      // Delay re-enabling the button to match toast duration
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Keep button disabled for 2 seconds
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
            animationSize={25}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1}
            speed={0.5}
          />
          <ToastContainer className="custom-notification" />

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
                text={loading ? "Loading..." : "Acces your account"}
                type="submit"
                handleOnClick={handleSubmitForm}
                disabledValue={loading}
              />
              <p>Don't you have an account <span><Link to="/register">Register</Link> </span> </p>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login