import { useState } from 'react';
import { FormRow } from '../../../components/formRow';
import { createPizza } from '../../../api/adminApi';
import Pizza from '../../../components/pizza/Pizza';
import { toast } from 'react-toastify';

const CreatePizza = () => {
  const [name, setName] = useState("");
  const [arrayCategory, setArrayCategory] = useState<string[]>([]);
  const [arrayIngredients, setArrayIngredients] = useState<string[]>([]);
  const [basePrice, setBasePrice] = useState("");
  const [arrayDough, setArrayDough] = useState<string[]>([]);
  const [arraySize, setArraySize] = useState<string[]>([]);
  const [url, setUrl] = useState("");

  const categories = ["Vegan", "Non-gluten", "Meat", "Cheese", "Vegetarian", "Seafood"];
  const pizzaDoughOptions = ["Light", "Traditional"];
  const pizzaSizeOptions = ["26", "30", "40"];

  const handleCategoryToggle = (event: React.MouseEvent<HTMLButtonElement>, category: string) => {
    event.preventDefault();
    setArrayCategory(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const handleAddIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setArrayIngredients([...arrayIngredients, ""]);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...arrayIngredients];
    newIngredients[index] = value;
    setArrayIngredients(newIngredients);
  };

  // Corrected dough toggle handler
  const handleDoughToggle = (event: React.MouseEvent<HTMLButtonElement>, doughType: string) => {
    event.preventDefault();
    setArrayDough(prev =>
      prev.includes(doughType)
        ? prev.filter(d => d !== doughType)
        : [...prev, doughType]
    );
  };

  const handleSizeToggle = (event: React.MouseEvent<HTMLButtonElement>, size: string) => {
    event.preventDefault();
    setArraySize(prev =>
      prev.includes(size)
        ? prev.filter(cat => cat !== size)
        : [...prev, size]
    );
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await createPizza(
        name,
        arrayCategory,
        arrayIngredients,
        parseInt(basePrice),
        arrayDough,
        arraySize,
        url
      );
      console.log(response.data);
      toast.success("Pizza created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create pizza.");
    }
  };

  return (
    <div className="create-container">
      <div className="create-pizza">
        <h1>Create Pizza</h1>
        <form className="create-pizza-form">
          {/* Pizza Name */}
          <FormRow
            placeHolderText="Name"
            labelText="Pizza name"
            typeInput="text"
            value={name}
            handleOnChange={(e) => setName(e.target.value)}
          />

          {/* Category Selection */}
          <div className="category">
            <p>Category</p>
            <div className="choose-category">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-button ${arrayCategory.includes(category) ? "selected" : ""}`}
                  onClick={(e) => handleCategoryToggle(e, category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="ingredients">
            <p>Ingredients</p>
            <button className="add-ingredients" onClick={handleAddIngredient}>
              Add one more
            </button>
            {arrayIngredients.map((ingredient, index) => (
              <FormRow
                key={index}
                placeHolderText={`Ingredient ${index + 1}`}
                labelText={`Ingredient ${index + 1}`}
                typeInput="text"
                value={ingredient}
                handleOnChange={(e) => handleIngredientChange(index, e.target.value)}
              />
            ))}
          </div>

          {/* Base Price */}
          <FormRow
            placeHolderText="Price"
            labelText="Base price"
            typeInput="number"
            value={basePrice}
            handleOnChange={(e) => setBasePrice(e.target.value)}
          />

          {/* Pizza Dough Selection */}
          <div className='pizza-dough'>
            <p>Pizza dough</p>
            <div className="choose-dough">
              {pizzaDoughOptions.map((dough) => (
                <button
                  key={dough}
                  className={`dough-button ${arrayDough.includes(dough) ? "selected" : ""}`}
                  onClick={(e) => handleDoughToggle(e, dough)}
                >
                  {dough}
                </button>
              ))}
            </div>

            <div className='pizza-size'>
              <p>Pizza size</p>
              {pizzaSizeOptions.map((size) => (
                <button
                  key={size}
                  className={`size-button ${arraySize.includes(size) ? "selected" : ""}`}
                  onClick={(e) => handleSizeToggle(e, size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <FormRow
              placeHolderText="Url image"
              labelText="Url image"
              typeInput="text"
              value={url}
              handleOnChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button className='submit-create' onClick={handleSubmit}>Submit</button>
        </form>
      </div>

      <div className='show-result-pizza'>
        <h1>Here is the result of the looking of the pizza</h1>
        <Pizza 
          name={name}
          category={arrayCategory} 
          ingredients={arrayIngredients}
          basePrice={parseInt(basePrice)}
          pizzaDough={arrayDough}
          pizzaSize={arraySize}
          img={url}
          buttonDisabled={true}
        />
      </div>  
    </div>
  );
};

export default CreatePizza;
