import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

interface AuthResponse {
    email: string;
    password: string;
}

export const userLogin = (email: string, password: string): Promise<AuthResponse> => {
    return axios.post<AuthResponse>(`${baseURL}/api/login`, { email, password })
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const register = (email: string, username: string, password: string) => {
    return axios.post(`${baseURL}/api/register`, { email, username, password })
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const logoutUser = (): Promise<void> => {
    return axios.post<void>(`${baseURL}/api/logout`, { withCredentials: true })
        .then(response => {
            return response
        })
        .catch(error => {
            return error;
        });
};

export const checkUserAuthentication = () => {
    return axios.get(`${baseURL}/api/user`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};