/**
* @file api.js
* @author Micah Chen
* @description This module exports a pre-configured instance of axios for making HTTP requests to the server.
* It includes an interceptor that automatically adds an Authorization header to each request, using an access token from local storage if available.
* This ensures that all requests are authenticated if the user is logged in.
*/

import axios from 'axios';
import { ACCESS_TOKEN } from './Constants';

const api = axios.create({
    baseURL: process.env.REACT_APP_HARBINGER_BACKEND_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // jwt token added `Bearer ` to the token for syntax
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
