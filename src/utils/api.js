
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/backend',
});

// Interceptor to add access token to each request
client.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Interceptor to handle 401 errors and refresh access token
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            try {
                // hitting the the refresh token api
                const response = await client.post(
                    'http://localhost:8000/api/token/refresh/',
                    { refresh: localStorage.getItem('refreshToken') },
                    { withCredentials: true }
                );
                sessionStorage.setItem('accessToken', response.data.access);
                error.config.headers.Authorization = `Bearer ${response.data.access}`;
                return api(error.config); // retry the original request
            } catch (refreshError) {
                localStorage.removeItem('refreshToken');
                sessionStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default client;
