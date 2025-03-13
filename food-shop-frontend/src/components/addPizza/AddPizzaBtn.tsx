import React from 'react';
import { RiAddFill } from "react-icons/ri";

interface AddPizzaBtnProps {
    buttonDisabled: boolean;
    handleAdd?: () => void; // Simplified to match the `handleAddPizzas` function
}

const AddPizzaBtn: React.FC<AddPizzaBtnProps> = ({ buttonDisabled, handleAdd }) => {
    return (
        <button className="button-add-pizza" disabled={buttonDisabled} onClick={handleAdd}>
            <RiAddFill className='icon' />
            Add pizza
        </button>
    );
};

export default AddPizzaBtn;