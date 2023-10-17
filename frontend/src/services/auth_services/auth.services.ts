import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000'; 

interface AuthResponse {
    email: string;
    password: string;
}

interface User {
    id: number;
    username: string;
}

export const login = (email: string, password: string): Promise<AuthResponse> => {
    return axios.post<AuthResponse>(`${baseURL}/api/login`, { email, password })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

export const register = (email: string, username: string, password: string): Promise<AuthResponse> => {
    return axios.post<AuthResponse>(`${baseURL}/api/register`, { email, username, password })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

export const logoutUser = (): Promise<void> => {
    return axios.post<void>(`${baseURL}/api/logout`, { withCredentials: true })
        .then(response => {
            // Aquí puedes manejar la respuesta de logout si es necesario
        })
        .catch(error => {
            throw error;
        });
};

export const checkUserAuthentication = () => {
    return axios.get(`${baseURL}/api/user`)
        .then(response => {
            // Aquí puedes manejar la respuesta de autenticación
            return true; // Supongo que esto significa autenticado
        })
        .catch(error => {
            // Aquí puedes manejar el error de autenticación
            return false; // Supongo que esto significa no autenticado
        });
};