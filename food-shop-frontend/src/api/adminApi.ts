import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: api_url,
    withCredentials: true
});

export const getUsers = async (percentage:number) => {
    try {
        const  data = await api.post("/get-users",{ percent: percentage })
        return {status:data.status, data:data}
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { status: error.response?.status, data: error.response?.data };
        }
        return { status: 500, data: { message: "Unexpected error occurred" } };
    }
 }

export const createPizza = async(
    name:string, 
    category:Array<string>,
    ingredients:Array<string>,
    basePrice:number,
    pizzaDough:Array<string>,
    pizzaSize:Array<string>, 
    img:string
) =>{
    try {
        const data = await api.post("/create-pizza",{
            name:name, 
            category:category,
            ingredients:ingredients,
            basePrice:basePrice,
            pizzaDough:pizzaDough,
            pizzaSize:pizzaSize, 
            img:img
        })
        return {status:data.status, data:data}
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { status: error.response?.status, data: error.response?.data };
        }
        return { status: 500, data: { message: "Unexpected error occurred" } };
    }
}

export const readPizza = async (page = 1, limit = 5, category ="All" , sortBy= "None") => {
    try {
      const response = await api.get(`/get-pizza?page=${page}&limit=${limit}&category=${category}&sortBy=${sortBy}`);
      return { status: response.status, data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return { status: error.response?.status, data: error.response?.data };
      }
      return { status: 500, data: { message: "Unexpected error occurred" } };
    }
  };

export const editPizza = async ( 
    name:string, 
    category:Array<string>,
    ingredients:Array<string>,
    basePrice:number,
    pizzaDough:Array<string>,
    pizzaSize:Array<string>, 
    img:string,
    _id:string,) =>{
    try {
        const response = await api.patch("/edit-pizza" ,{ 
            _id:_id,
            name:name, 
            category:category,
            ingredients:ingredients,
            basePrice:basePrice,
            pizzaDough:pizzaDough,
            pizzaSize:pizzaSize, 
            img:img});
        return { status: response.status, data: response.data };
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          return { status: error.response?.status, data: error.response?.data };
        }
        return { status: 500, data: { message: "Unexpected error occurred" } };
      }
}
export const deletePizza = async (_id:string) =>{
    try {
        const response = await api.delete("/delete-pizza" ,{data: { _id } });
        return { status: response.status, data: response.data };
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          return { status: error.response?.status, data: error.response?.data };
        }
        return { status: 500, data: { message: "Unexpected error occurred" } };
      }
}
  
