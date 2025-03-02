import { useState,useEffect } from "react";
import { IconType } from "react-icons";
import classNames from "classnames";

export type FormRowProps = {
    labelText:string,
    placeHolderText?:string,
    typeInput:string
    value?:string;
    handleOnChange: ( event: React.ChangeEvent<HTMLInputElement>) => void;
    name?:string
    iconOpenEye?:IconType
    iconClosedEye?:IconType
    errorMessage?:string
}

const FormRow:React.FC<FormRowProps> = ({
    labelText,
    placeHolderText = "text", 
    typeInput,
    handleOnChange,
    value,
    name,
    iconOpenEye:OpenEye,
    iconClosedEye:ClosedEye,
    errorMessage
    }) => {
    const [passwordVisible,setPassowrdVisible] =useState(false)
    const [isShaking,setIsShaking] = useState(false)
    
    const togglePasswordVisible= ():void =>{
        setPassowrdVisible(prev=>!prev)
    }
    useEffect(() => {
        if (errorMessage && errorMessage.trim() !== "") {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 1000);
        }
    }, [errorMessage]);

    return (
    <>
   {errorMessage && <p className="error-message">{errorMessage}</p>}
    <div className={classNames("form-row",{shake:isShaking})}>
        <label className="label">{labelText}</label>
        <input 
            placeholder={placeHolderText}
            type={typeInput === "password" ? (passwordVisible ? "text" : "password") : typeInput}
            className="input"
            value={value}
            onChange={handleOnChange}
            name={name}
        />
       {OpenEye && ClosedEye && (
         passwordVisible ? 
        <OpenEye  onClick={togglePasswordVisible} className="icon-eye" /> : 
        <ClosedEye onClick={togglePasswordVisible} className="icon-eye"/>
        )}
    </div>
    
    </>
    
  )
}

export default FormRow