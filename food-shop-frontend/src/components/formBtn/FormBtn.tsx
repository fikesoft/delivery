import React from "react"
type FormBtnProps = {
    text:string
    type:"button" | "submit"
    handleOnClick: () => void
    disabledValue:boolean
}
const FormBtn : React.FC<FormBtnProps> = ({text,type,handleOnClick,disabledValue}) => {
  return (
    <button 
    type={type}
    onClick={handleOnClick}
    className="form-btn"
    disabled={disabledValue}
    >
        {text}
    </button>
  )
}

export default FormBtn