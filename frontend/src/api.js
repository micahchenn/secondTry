/// This file sets up a pre-configured instance of axios for making HTTP requests to the server.
// It also sets up an interceptor that adds an Authorization header to each request if an access token is present in local storage.

import axios from 'axios';
import { ACCESS_TOKEN } from './Constants';

const api = axios.create({
    baseURL: process.env.REACT_APP_HARBINGER_BACKEND_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // jwt token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;