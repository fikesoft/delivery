import { registerUser, loginUser } from "./authApi";
import { getUsers } from "./adminApi";
import { createPizza } from "./adminApi";

const authApi = {
    registerUser,
    loginUser
};

const adminApi = {
    getUsers,
    createPizza
};

export default authApi;
export { adminApi };  