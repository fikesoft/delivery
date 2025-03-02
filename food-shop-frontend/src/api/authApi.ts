import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: api_url,
    withCredentials: true
});

export const registerUser = async (username: string, login: string, password: string) => {
    try {
        const response = await api.post("/register", { username, login, password });
        return { status: response.status, data: response.data };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { status: error.response?.status, data: error.response?.data };
        }
        return { status: 500, data: { message: "Unexpected error occurred" } };
    }
};

export const loginUser = async (login: string, password: string) => {
    try {
        const response = await api.post("/login", { login, password });
        return { status: response.status, data: response.data };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};
