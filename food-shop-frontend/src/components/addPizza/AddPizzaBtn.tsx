import React from 'react';
import { RiAddFill } from "react-icons/ri";

interface AddPizzaBtnProps {
  buttonDisabled: boolean;
}

const AddPizzaBtn: React.FC<AddPizzaBtnProps> = ({ buttonDisabled }) => {
  return (
    <button className="button-add-pizza" disabled={buttonDisabled}>
      <RiAddFill className='icon'/>
      Add pizza
    </button>
  );
};

export default AddPizzaBtn;
