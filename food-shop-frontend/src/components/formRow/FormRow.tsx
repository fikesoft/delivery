import { useState } from "react";
import { IconType } from "react-icons";

export type FormRowProps = {
    labelText:string,
    placeHolderText?:string,
    typeInput:string
    value?:string;
    handleOnChange: ( event: React.ChangeEvent<HTMLInputElement>) => void;
    name?:string
    iconOpenEye?:IconType
    iconClosedEye?:IconType
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
    }) => {
    const [passwordVisible,setPassowrdVisible] =useState(false)
    
    const togglePasswordVisible= ():void =>{
        setPassowrdVisible(prev=>!prev)
    }
    return (
    <div className="form-row">
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
  )
}

export default FormRow