import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import "./Login.css"

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);

          // Handle successful login here
          <Link to='/home'></Link>
          
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle login error here
        });
    };
  return (
    < div style={{display:'flex', justifyContent: 'center'}}>
    <div className="login-container">
 <div className="main-container">
    <h1 className="login-title">Login</h1>
    <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
            
            {/* <label htmlFor="username" className="form-label">Username:</label> */}
        
            <input
                type="text"
                id="email"
                placeholder="email"
                name="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
           {/* <i class="fa-solid fa-user"></i> */}
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
       
    </form>
    </div>
    
</div>
<div class="welcome-container">
        <h1>Welcome Back!</h1>
        <p>Enter personal details to your employee account.</p>
        <button class="register-button"> 
          <Link to="/register" className="login-link">Register</Link></button>
    </div>
    </div>
);
  
}