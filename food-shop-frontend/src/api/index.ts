import { registerUser, loginUser } from "./authApi";
import { getUsers } from "./adminApi";
import { createPizza } from "./adminApi";
import { readPizza } from "./adminApi";
import { editPizza } from "./adminApi";
const authApi = {
    registerUser,
    loginUser
};

const adminApi = {
    getUsers,
    createPizza,
    readPizza,
    editPizza
};

export default authApi;
export { adminApi };  