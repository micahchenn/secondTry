/**
 * @file Login_Page.jsx
 * @author Micah Chen 
 * @date Last Modified: 5/20/2024
 * 
 * Description: This file contains the implementation of the login page. The login functionality is achieved by sending a POST request
 * to the server with the user's username and password. This request is facilitated by an Axios instance, which is defined
 * in the api.js file.
 * 
 * Upon successful login, the server responds with access and refresh tokens. These tokens are then stored in the local 
 * storage for future use. The user is then redirected to the home page.
 * 
 * In case of an unsuccessful login attempt, an appropriate error message is displayed to the user. 
 * (We created a translate a error at the bottom of the file to handle different error cases for HTTP response status codes.)
 */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents the form from being submitted in the traditional way, which includes a page refresh.

        try {
            const res = await api.post("authenticate/user-login/", { username, password }); //res sends a post to the server to login
            localStorage.setItem(ACCESS_TOKEN, res.data.access); //if it is successful, the access and refresh token is stored in local storage
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh); 
            navigate("/");
        } catch (error) {
            setError(translateError(error));
        } finally {
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                Login
            </button>
            {error && <p>{error}</p>}
        </form>
    );
}

const translateError = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return 'Invalid username or password';
            case 404:
                return 'Username not found';
            default:
                return 'An error occurred. Please try again later.';
        }
    } else {
        return 'An error occurred. Please try again later.';
    }
};

export default Login;

