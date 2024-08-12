import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from "../../api"; // Ensure this path is correct
import './SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("authenticate/user-signup/", { username, email, password });
      navigate("/login");
    } catch (error) {
      setError(translateError(error));
    }
  };

  const translateError = (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        return 'Username or email is not allowed';
      }
      return 'An error occurred with the fields you provided. Please try with different fields.';
    } else {
      return 'An error occurred. Please try again later.';
    }
  };

  return (
    <div className="signup-page d-flex justify-content-center align-items-center vh-100">
      <div className="radial-gradient-bg"></div>
      <div className="signup-container">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="signup-error-message">{error}</p>}
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
            <label htmlFor="email">Email</label>
            <div className="position-relative">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                className="form-control email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="toggle-password" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
        
          <button type="submit" className="btn btn-primary btn-block">Create Account</button>
        </form>
        <p>Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
}

export default SignupPage;
