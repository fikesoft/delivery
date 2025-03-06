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
