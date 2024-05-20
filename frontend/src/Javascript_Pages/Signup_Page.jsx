/**
 * @file Signup_Page.jsx
 * @author Micah Chen
 * @date Last Modified: 5/20/2024
 *
 * Description: This file contains the implementation of the signup page. The signup functionality is achieved by sending a POST request
 * to the server with the user's username, email, and password. This request is facilitated by an Axios instance, which is defined
 * in the api.js file.
 * 
 * Backend API: POST request to /authenticate/user-register/ calls the CreateUserView view in views.py
 *
 * Upon successful signup, the user is redirected to the login page to authenticate themselves.
 *
 * In case of an unsuccessful signup attempt, an appropriate error message is displayed to the user. 
 * (We created a translateError function at the bottom of the file to handle different error cases for HTTP response status codes.)
 * 
 * TODO: ADD frontend validation for email and password fields and add a confirm password field. 
 * Add Backend error codes for invalid fields like username already exists or email already exists.
 */

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
//import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("authenticate/user-signup/", { username, email, password });
            //localStorage.setItem(ACCESS_TOKEN, res.data.access); 
            //localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/login");
        } catch (error) {
            setError(translateError(error));
        } finally {
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Signup</h1>
            {error && <p className="error-message">{error}</p>}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit">
                Signup
            </button>
        </form>
    );
}

const translateError = (error) => {
    if (error.response) {
        if (error.response.status === 400) {
            return 'Username or email is not allowed';
        }
        return 'An error occurred with the fields you provided Please try with different fields.';
    } else {
        return 'An error occurred. Please try again later.';
    }
};

export default Signup;