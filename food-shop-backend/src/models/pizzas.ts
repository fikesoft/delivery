import mongoose, { Schema, Document } from "mongoose";

// Define enums
enum CategoryType {
  VEGAN = "Vegan",
  NON_GLUTEN = "Non-gluten",
  MEAT = "Meat",
  CHEESE = "Cheese",
  VEGETARIAN = "Vegetarian",
  SEAFOOD = "Seafood"
}

enum PizzaDoughType {
  TRADITIONAL = "Traditional",
  LIGHT = "Light"
}

enum PizzaSizeType {
  BIG = "40",
  SMALL = "30",
  DEFAULT = "26"
}

// Define the interface
export interface IPizza extends Document {
  name: string;
  category: CategoryType[]; // Array of categories
  ingredients: string[]; // Array of strings
  basePrice: number;
  pizzaDough: PizzaDoughType[]; // Array of dough types
  pizzaSize: PizzaSizeType[]; // Array of sizes
  img: string; // Image URL (required)
}

// Define the schema
const PizzaSchema = new Schema<IPizza>({
  name: {
    type: String,
    required: true
  },
  category: {
    type: [String], // Array of strings
    required: true,
    enum: Object.values(CategoryType) // Restrict values to enum options
  },
  ingredients: {
    type: [String], // Array of strings
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  pizzaDough: {
    type: [String], // Array of strings
    required: true,
    enum: Object.values(PizzaDoughType) // Restrict values to enum options
  },
  pizzaSize: {
    type: [String], // Array of strings
    required: true,
    enum: Object.values(PizzaSizeType) // Restrict values to enum options
  },
  img: {
    type: String,
    required: true // Image is required
  }
});

// Create and export the model
const Pizza = mongoose.model<IPizza>("Pizza", PizzaSchema);
export default Pizza;
