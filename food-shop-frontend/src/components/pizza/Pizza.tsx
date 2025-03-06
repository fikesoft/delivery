import { useState } from "react";
import AddPizzaBtn from "../addPizza/AddPizzaBtn"
import { CiCircleInfo } from "react-icons/ci";

type PizzaProps ={
    name:string, 
    ingredients:Array<string>,
    basePrice:number,
    pizzaDough:Array<string>,
    pizzaSize:Array<string>, 
    img:string,
    category?:Array<string>,
    buttonDisabled?:boolean,
    _id?:string,
}

const doughMultipliers: Record<string, number> = {
    "Light": 1.1,        // Example: 10% more expensive
    "Traditional": 1.2,  // Example: 20% more expensive
  };
  
  const sizeMultipliers: Record<string, number> = {
    "26": 1,   // Default size (no change)
    "30": 1.2, // Example: 20% increase
    "40": 1.5, // Example: 50% increase
  };

  
const Pizza : React.FC<PizzaProps> = ({
    name,
    category=[],
    ingredients,
    basePrice,
    pizzaDough,
    pizzaSize , 
    img,
    buttonDisabled=false,
    _id
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedDough, setSelectedDough] = useState<string | null>(null);
    const [selectedSize ,setSelectedSize ] = useState<string | null>(null);

    const handleDoughSelect = (dough: string) => {
        setSelectedDough(dough);
      };

    const handleSizeSelect = (size:string ) =>{
        setSelectedSize(size)
    }

    const handlePriceChange = ():string => {
        const base = basePrice;
        const doughMultiplier = selectedDough ? doughMultipliers[selectedDough] || 1 : 1;
        const sizeMultiplier = selectedSize ? sizeMultipliers[selectedSize] || 1 : 1;
        
        return (base * doughMultiplier * sizeMultiplier).toFixed(1);
    }


    return (
    <div className="pizza">
        <div className="pizza-ingredients">
            <CiCircleInfo
                className="icon"  
                onMouseOver={() => setIsHovered(true)} 
                onMouseOut={() => setIsHovered(false)}
            />
            {isHovered ? 
            <div className={`additionalInfo-${isHovered ? "true" : "false"} ${isHovered ? "visible" : ""}`}> 

            {ingredients.map((ingredient, index) => (
                //key 0  > index +1 
                <p key={index}>Ingredient {index+1} : {ingredient.toLowerCase()}</p>
            ))}
            </div>

            : <div className={`additionalInfo-${isHovered}`}></div>}
        </div>
        <div className="pizza-img">
            <img src={img} alt="pizza"/>
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
                        {size}
                        
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
                <AddPizzaBtn buttonDisabled={buttonDisabled}></AddPizzaBtn>
            </div>
        </div>
    </div>
  )
}

export default Pizza