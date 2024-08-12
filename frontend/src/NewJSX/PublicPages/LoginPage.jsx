import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from "../../api"; // Ensure this path is correct
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Constants"; // Ensure this path is correct
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("authenticate/user-login/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/main-dashboard");
    } catch (error) {
      setError(translateError(error));
    }
  };

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

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="radial-gradient-bg"></div>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="login-error-message">{error}</p>}
          <div className="form-group text-left">
            <label htmlFor="username">Username</label>
            <div className="position-relative">
              <FaUser className="input-icon" />
              <input
                type="text"
                className="form-control username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group text-left">
            <label htmlFor="password">Password</label>
            <div className="position-relative">
              <FaLock className="input-icon" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="toggle-password" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
