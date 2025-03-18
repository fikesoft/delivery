import { useState } from "react";
import AddPizzaBtn from "../addPizza/AddPizzaBtn";
import { CiCircleInfo } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from "../../context/CartContext";

type PizzaProps = {
    name: string;
    ingredients: Array<string>;
    basePrice: number;
    pizzaDough: Array<string>;
    pizzaSize: Array<string>;
    img: string;
    category?: Array<string>;
    buttonDisabled?: boolean;
    _id?: string;
};

type PizzaHandleProps = {
    name: string;
    basePrice: number;
    pizzaDough: Array<string | null>;
    pizzaSize: Array<string>;
    img: string;
    _id?: string;
};

const doughMultipliers: Record<string, number> = {
    "Light": 1.1,
    "Traditional": 1.2,
};

const sizeMultipliers: Record<string, number> = {
    "26": 1,
    "30": 1.2,
    "40": 1.5,
};

const Pizza: React.FC<PizzaProps> = ({
    name,
    category = [],
    ingredients,
    basePrice,
    pizzaDough = [],
    pizzaSize = [],
    img,
    buttonDisabled = false,
    _id = undefined,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedDough, setSelectedDough] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { addToCart } = useCart();
    
    const handleDoughSelect = (dough: string) => {
        setSelectedDough(dough);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const handlePriceChange = (): string => {
        const base = basePrice;
        const doughMultiplier = selectedDough ? doughMultipliers[selectedDough] || 1 : 1;
        const sizeMultiplier = selectedSize ? sizeMultipliers[selectedSize] || 1 : 1;
        return (base * doughMultiplier * sizeMultiplier).toFixed(1);
    };
    const handleAddPizzas = () => {
        if (!selectedDough || !selectedSize) {
            if (!toast.isActive(13)) {
                console.log("First time running this error toast");
                toast.error('Please select a dough and size!', {
                    position: "bottom-right",
                    autoClose: false,
                    closeOnClick: true,
                    draggable: false,
                    toastId: 13                      
                });
            }
            return;
        }
    
        const pizzaItem = {
            name,
            price: parseFloat(handlePriceChange()),
            pizzaDough: [selectedDough],
            pizzaSize: [selectedSize],
            img,
            id: `${_id}-${selectedDough}-${selectedSize}`,
            quantity: 1,
        };
    
        addToCart(pizzaItem);
    
        // Trigger the success toast with autoClose disabled
             toast.success("Pizza added", {
            position: "top-right",
            autoClose: false,  // Disable auto-close
            hideProgressBar: true,
            toastId: "pizzaToast"
        });
    
        // Manually dismiss the toast after 2500ms
        setTimeout(() => {
            if (toast.isActive("pizzaToast")) { 
                toast.dismiss("pizzaToast");
                console.log(`Toast "pizzaToast" dismissed manually`);
            }
        }, 2500);
    };
    
      
      
    return (
        <div className="pizza" key={_id}>

            <div className="pizza-ingredients">
                <CiCircleInfo
                    className="icon"
                    onMouseOver={() => setIsHovered(true)}
                    onMouseOut={() => setIsHovered(false)}
                />
                {isHovered ? (
                    <div className={`additionalInfo-${isHovered ? "true" : "false"} ${isHovered ? "visible" : ""}`}>
                        {ingredients.map((ingredient, index) => (
                            <p key={index}>
                                Ingredient {index + 1}: {ingredient.toLowerCase()}
                            </p>
                        ))}
                    </div>
                ) : (
                    <div className={`additionalInfo-${isHovered}`}></div>
                )}
            </div>
            <div className="pizza-img">
                <img src={img ? img : undefined} alt="pizza" />
            </div>

            <div className="heading">
                <h1 className="title">{name}</h1>
            </div>
            <div className="custom-pizza">
                <div className="pizza-dough">
                    {pizzaDough.length > 0 ? (
                        pizzaDough.map((dough) => (
                            <p
                                key={dough}
                                className={`pizza-dough-option ${selectedDough === dough ? "selected" : ""}`}
                                onClick={() => handleDoughSelect(dough)}
                            >
                                {dough}
                            </p>
                        ))
                    ) : (
                        <p>No dough options available</p>
                    )}
                </div>
                <div className="pizza-size">
                    {pizzaSize.length > 0 ? (
                        pizzaSize.map((size) => (
                            <p
                                key={size}
                                className={`pizza-size-option ${selectedSize === size ? "selected" : ""}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}cm
                            </p>
                        ))
                    ) : (
                        <p>No size options available</p>
                    )}
                </div>
            </div>

            <div className="pizza-buy">
                <div className="pizza-price">
                    <p>{handlePriceChange()}$</p>
                </div>
                <div className="pizza-add">
                    <AddPizzaBtn
                        buttonDisabled={buttonDisabled}
                        handleAdd={handleAddPizzas}
                    />
                </div>
            </div>
        </div>
    );
};

export default Pizza;