import React from "react"
type FormBtnProps = {
    text:string
    type:"button" | "submit"
    handleOnClick: () => void
}
const FormBtn : React.FC<FormBtnProps> = ({text,type,handleOnClick}) => {
  return (
    <button 
    type={type}
    onClick={handleOnClick}
    className="form-btn"
    >
        {text}
    </button>
  )
}

export default FormBtn