import React, { useEffect, useState } from 'react';
import { readPizza, editPizza, deletePizza } from '../../../api/adminApi';
import Pagination from '../../../components/pagination/Pagination';
import Pizza from '../../../components/pizza/Pizza';
import { MdDelete, MdDone } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { FormRow } from '../../../components/formRow';
import { IoCloseSharp } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type EditFormState = {
  _id: string | null;
  name: string;
  category: string[];
  ingredients: string[];
  pizzaDough: string[];
  pizzaSize: string[];
  img: string;
  basePrice: string;
};

const initialEditFormState: EditFormState = {
  _id: null,
  name: "",
  category: [],
  ingredients: [],
  pizzaDough: [],
  pizzaSize: [],
  img: "",
  basePrice: "",
};

const UpdatePizza = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  // Single state for all editing form values
  const [editForm, setEditForm] = useState<EditFormState>(initialEditFormState);

  const categories = ["Vegan", "Non-gluten", "Meat", "Cheese", "Vegetarian", "Seafood"];
  const pizzaSizeOptions = ["26", "30", "40"];
  const pizzaDoughOptions = ["Light", "Traditional"];

  const fetchData = async (page: number) => {
    try {
      const response = await readPizza(page, limit);
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        console.error("Error: Data is not an array", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Initialize the edit form with the selected pizza's data
  const handleEditClick = (pizza: any) => {
    setEditForm({
      _id: pizza._id,
      name: pizza.name,
      category: Array.isArray(pizza.category) ? [...pizza.category] : [],
      ingredients: pizza.ingredients,
      pizzaDough: pizza.pizzaDough,
      pizzaSize: pizza.pizzaSize,
      img: pizza.img,
      basePrice: pizza.basePrice,
    });
  };

  // Reset the edit form state
  const handleCancelEdit = () => {
    setEditForm(initialEditFormState);
  };

  // Update a field in the edit form state
  const updateEditField = (field: keyof EditFormState, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle category selection in the edit form
  const handleCategoryToggle = (e: React.MouseEvent<HTMLButtonElement>, category: string) => {
    e.preventDefault();
    setEditForm((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((cat) => cat !== category)
        : [...prev.category, category],
    }));
  };

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateEditField("ingredients", [...editForm.ingredients, ""]);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...editForm.ingredients];
    newIngredients[index] = value;
    updateEditField("ingredients", newIngredients);
  };

  const handleDoughToggle = (e: React.MouseEvent<HTMLButtonElement>, doughType: string) => {
    e.preventDefault();
    setEditForm((prev) => ({
      ...prev,
      pizzaDough: prev.pizzaDough.includes(doughType)
        ? prev.pizzaDough.filter((d) => d !== doughType)
        : [...prev.pizzaDough, doughType],
    }));
  };

  const handleSizeToggle = (e: React.MouseEvent<HTMLButtonElement>, size: string) => {
    e.preventDefault();
    setEditForm((prev) => ({
      ...prev,
      pizzaSize: prev.pizzaSize.includes(size)
        ? prev.pizzaSize.filter((s) => s !== size)
        : [...prev.pizzaSize, size],
    }));
  };

  const handleEdit = async (
    name: string,
    category: Array<string>,
    ingredients: Array<string>,
    basePrice: number,
    pizzaDough: Array<string>,
    pizzaSize: Array<string>,
    img: string,
    _id: string,
  ) => {
    // Basic validation
    if (!name.trim()) {
      toast.error("Pizza name is required");
      return;
    }
    if (!basePrice || isNaN(basePrice)) {
      toast.error("A valid base price is required");
      return;
    }
    if (ingredients.length === 0) {
      toast.error("At least one ingredient is required");
      return;
    }
    try {
      const response = await editPizza(
        name,
        category,
        ingredients,
        basePrice,
        pizzaDough,
        pizzaSize,
        img,
        _id,
      );
      toast.success("Pizza updated successfully!");
      // Optionally, refresh the list to reflect updates
      fetchData(currentPage);
      setEditForm(initialEditFormState);
    } catch (error) {
      toast.error("Error editing pizza!");
      console.error("Error editing data:", error);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      console.log(_id)
      const response = await deletePizza(_id);
      toast.success("Pizza deleted successfully!");
      // Refresh data after deletion
      fetchData(currentPage);
    } catch (error) {
      toast.error("Error deleting pizza!");
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="show-pizza">
      <div className="pizzas">
        {data.length > 0 ? (
          data.map((pizza) => (
            <div className="actions-pizza" key={pizza._id}>
              <div className="actions">
                {editForm._id === pizza._id ? (
                  <div className="input-edit-pizza">
                    <IoCloseSharp className="cancel-icon" onClick={handleCancelEdit} />
                    <MdDone
                      className="done-icon"
                      onClick={() =>
                        handleEdit(
                          editForm.name,
                          editForm.category,
                          editForm.ingredients,
                          parseInt(editForm.basePrice),
                          editForm.pizzaDough,
                          editForm.pizzaSize,
                          editForm.img,
                          pizza._id,
                        )
                      }
                    />
                    <img src={editForm.img} alt="img-pizza" />
                    <div className="form">
                      <FormRow
                        labelText="Name"
                        placeHolderText="name"
                        typeInput="text"
                        handleOnChange={(e) => updateEditField("name", e.target.value)}
                        value={editForm.name}
                        name="name"
                      />
                      <div className="category">
                        <p>Category</p>
                        <div className="choose-category">
                          {categories.map((category) => (
                            <button
                              key={category}
                              className={`category-button ${
                                editForm.category.includes(category) ? "selected" : ""
                              }`}
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
                        {editForm.ingredients.map((ingredient, index) => (
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
                        value={editForm.basePrice}
                        handleOnChange={(e) => updateEditField("basePrice", e.target.value)}
                      />

                      <div className="pizza-dough">
                        <p>Pizza dough</p>
                        <div className="choose-dough">
                          {pizzaDoughOptions.map((dough) => (
                            <button
                              key={dough}
                              className={`dough-button ${
                                editForm.pizzaDough.includes(dough) ? "selected" : ""
                              }`}
                              onClick={(e) => handleDoughToggle(e, dough)}
                            >
                              {dough}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pizza-size">
                        <p>Pizza size</p>
                        {pizzaSizeOptions.map((size) => (
                          <button
                            key={size}
                            className={`size-button ${
                              editForm.pizzaSize.includes(size) ? "selected" : ""
                            }`}
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
                        value={editForm.img}
                        handleOnChange={(e) => updateEditField("img", e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <FaEdit className="icon-edit" onClick={() => handleEditClick(pizza)} />
                )}
                <MdDelete className="icon-delete" onClick={() => handleDelete(pizza._id)} />
              </div>
              <Pizza
                name={pizza.name}
                category={pizza.category}
                ingredients={pizza.ingredients}
                basePrice={parseInt(pizza.basePrice)}
                pizzaDough={pizza.pizzaDough}
                pizzaSize={pizza.pizzaSize}
                img={pizza.img}
                buttonDisabled={true}
                _id={pizza._id}
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      {/* Toast container to render notifications */}
    </div>
  );
};

export default UpdatePizza;
