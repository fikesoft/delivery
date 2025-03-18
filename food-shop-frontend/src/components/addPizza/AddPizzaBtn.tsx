import React from 'react';
import { RiAddFill } from "react-icons/ri";

interface AddPizzaBtnProps {
    buttonDisabled: boolean;
    handleAdd?: () => void; // Simplified to match the `handleAddPizzas` function
}

const AddPizzaBtn: React.FC<AddPizzaBtnProps> = ({ buttonDisabled, handleAdd }) => {
    const handleClick = () => {
        if (handleAdd) {
            handleAdd(); // Call the provided `handleAdd` function
        }
    };

    return (
        <button
            className="button-add-pizza"
            disabled={buttonDisabled}
            onClick={handleClick} // Use the custom click handler
        >
            <RiAddFill className='icon' />
            Add pizza
        </button>
    );
};

export default AddPizzaBtn;