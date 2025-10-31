import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = "https://money-manager-api-5-cxz0.onrender.com/api/v1.0";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

//Add token to requestes
api.interceptors.request.use((config) => {
    const { token } = useAuthStore.getState()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//Handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
            window.location.href = "/login"
        }
        return Promise.reject(error)
    },
)

export const authAPI = {
    login: (email, password) => api.post("/login", { email, password }),
    signup: (email, password, name) => api.post("/register", { email, password, name }),
}

export const expenseAPI = {
    getAll: () => api.get("/expenses"),
    create: (data) => api.post("/expenses", data),
    update: (id, data) => api.put(`/expenses/${id}`, data),
    delete: (id) => api.delete(`/expenses/${id}`,),
}

export const incomeAPI = {
    getAll: () => api.get("/incomes"),
    create: (data) => api.post("/incomes", data),
    update: (id, data) => api.put(`/incomes/${id}`, data),
    delete: (id) => api.delete(`/incomes/${id}`),
}

export const categoryAPI = {
    getAll: () => api.get("/categories"),
    create: (data) => api.post("/categories", data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
}

export const dashboardAPI = {
    getAll: () => api.get("/dashboard"),
}
export const filterAPI = {
    filterTransactions: (filterDTO) => api.post("/filters", filterDTO),
};
export default api;