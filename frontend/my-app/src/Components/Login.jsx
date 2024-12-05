import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import "./Login.css"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle login logic here
      fetch("localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);

          // Handle successful login here
          
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle login error here
        });
    };
  return (
    <div className="login-container">
    <h1 className="login-title">Login</h1>
    <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
            
            {/* <label htmlFor="username" className="form-label">Username:</label> */}
        
            <input
                type="text"
                id="username"
                placeholder="username"
                name="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
           <i class="fa-solid fa-user"></i>
        </div>
        <div className="form-group">
            {/* <label htmlFor="password" className="form-label">Password:</label> */}
            <input
                type="password"
                id="password"
                placeholder="password"
                name="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

        </div>
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password</Link>

        <button type="submit" className="login-button">Login</button>
        <div className="login-links">
           <p className="register-link-p">Don't have an account? <a href="/register" className="register-link">Register</a></p>
        </div>
    </form>
</div>
);
  
}

