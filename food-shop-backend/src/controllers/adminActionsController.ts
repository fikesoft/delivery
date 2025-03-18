import { Request,Response } from "express"
import User from "../models/users"
import Pizza from "../models/pizzas"
import mongoose from "mongoose"
import { IPizza } from "../models/pizzas"

//Gets an part of the users and  give back an sample of that %
export const getUsers = async (request:Request,response:Response): Promise<void> =>{
        try {
            const { percent } = request.body 
            const  numberUsers = await User.countDocuments();
            const sampleSize = Math.ceil(numberUsers * ( percent/100));
            const users = await  User.aggregate([
                {$sample:{size:sampleSize}},
                {
                    $project:{
                        username:1,
                        login:1,
                        "deviceInfo.isMobile": 1,
                        "deviceInfo.isTablet": 1,
                        "deviceInfo.isDesktop": 1,
                        "deviceInfo.platform":1,
                        "deviceInfo.browser": 1,
                        "deviceInfo.screenResolution": 1,
                        isAdmin:1,
                        "location.country":1,
                        createdAt:1    
                    }
                }
            ])
            response.status(200).json(users)           
        } catch (error) {
            response.status(500).json({ error: "Failed to fetch sample" })
        }      
}
//Create pizza 
export const createPizza = async (request: Request, response: Response): Promise<void> => {
    try {
        const { name, category, ingredients, basePrice, pizzaDough, pizzaSize, img } = request.body;


        // Validate that all required fields are provided
        if (!name || !category || !Array.isArray(ingredients) || ingredients.length === 0 || 
            !basePrice || !pizzaDough || !pizzaSize || !img) {
            response.status(400).json({ error: "All fields, including a non-empty ingredients array, are required" });
            return;
        }
        
        const newPizza = new Pizza({
            name,
            category,
            ingredients,
            basePrice,
            pizzaDough, 
            pizzaSize,
            img
        });

        await newPizza.save();
        response.status(201).json({ message: "Pizza was created successfully", pizzaId: newPizza._id });
    } catch (error) {
        console.error("Error creating pizza:", error);
        response.status(500).json({ error: "Failed to create pizza" });
    }
};




export const deletePizza = async (request: Request, response: Response): Promise<void> => {
    try {
        const { _id: data } = request.body;

        if (!data || typeof data !== "string") {
            response.status(400).json({ error: "Invalid pizza ID format" });
            return;
        }

        // Trim spaces and ensure correct validation
        const trimmedId = data.trim();

        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            response.status(400).json({ error: "Invalid pizza ID" });
            return;
        }

        // Directly use the string id since Mongoose will convert it automatically
        const deletedPizza = await Pizza.findByIdAndDelete(trimmedId);

        if (!deletedPizza) {
            response.status(404).json({ error: "Pizza not found" });
            return;
        }

        response.status(200).json({ message: "Pizza successfully deleted" });

    } catch (error) {
        console.error("Error deleting pizza:", error);
        response.status(500).json({ error: "Failed to delete pizza" });
    }
};

export const getPizzas = async (req: Request, res: Response): Promise<void> => {
    try {
      let { page, limit , category,sortBy} = req.query;
  
      if (!page || !limit || !category || !sortBy) {
        // If no pagination parameters are provided, return all pizzas
        const pizzas = await Pizza.find();
          res.status(200).json({
          message: "Successfully fetched all pizzas",
          data: pizzas,
          totalItems: pizzas.length,    
        });
        return
      }
  
      // Convert query params to numbers
      const pageNumber = parseInt(page as string) || 1;
      const limitNumber = parseInt(limit as string) || 5;
      const totalItems = await Pizza.countDocuments();
      const totalPages = Math.ceil(totalItems / limitNumber);

      //Filter
      const categoryQuery = category && category !== "All" ? { category } : {};
    
      const sortByQuery: Record<string, 1 | -1> = {};;     
        
         if (sortBy === "priceAsc") {
            sortByQuery.basePrice = 1; // Ascending
        } else if (sortBy === "priceDesc") {
            sortByQuery.basePrice = -1; // Descending
        } else if (sortBy === "nameAsc") {
            sortByQuery.name = 1; // A-Z
        } else if (sortBy === "nameDesc") {
            sortByQuery.name = -1; // Z-A
        }
  
      const pizzas = await Pizza.find(categoryQuery)
        .sort(sortByQuery)   
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
  
      res.status(200).json({        
        message: "Successfully fetched paginated data",
        data: pizzas,
        totalItems,
        currentPage: pageNumber,
        itemsPerPage: limitNumber,
        totalPages,
      });
    } catch (error) {
      console.error("Error fetching pizza:", error);
      res.status(500).json({ error: "Failed to fetch pizza" });
    }
  };
  

export  const editPizza = async (request: Request, response: Response): Promise<void> =>{
    try {
        const { 
            _id,
            name,
            category,
            ingredients,
            basePrice,
            pizzaDough,
            pizzaSize,
            img   } = request.body;
        
        if (!_id) {
            response.status(400).json({ message: "Pizza id should be provided bu there is an error",});
            return;
        }

        const updatedData: Partial<IPizza> = {}; 

        if (name) updatedData.name = name;
        if (category) updatedData.category = category;
        if (ingredients) updatedData.ingredients = ingredients;
        if (basePrice) updatedData.basePrice = basePrice;
        if (pizzaDough) updatedData.pizzaDough = pizzaDough;
        if (pizzaSize) updatedData.pizzaSize = pizzaSize;
        if (img) updatedData.img = img;
        // If no update data is provided, return error
        if (Object.keys(updatedData).length === 0) {
            response.status(400).json({message: "You need atleast one of the data to edit to make the edit",});
            return 
        }
        // Find the quote by its id and update it
        const updatedPizza = await Pizza.findByIdAndUpdate(
            _id,
            { $set: updatedData },
            { new: true } // Returns the updated document
        );
        // If quote not found, respond with 404
        if (!updatedPizza) {
            response.status(404).json({message: "We didnt found the pizza try to check the id of the pizza",});
            return
        }
        response.status(200).json({message:"Pizza updated with new data", newPizza: updatedPizza})
        
     
    } catch (error) {
        console.error("Error editing pizza:", error);
        response.status(500).json({ error: "Failed to edit pizza try again later" });
    }
}