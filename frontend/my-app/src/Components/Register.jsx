import React from 'react'
import { useState } from 'react';
import "./Register.css";
export default function Register() {
  
    const [firstname, setFirstname] = useState("");
    const [secondname, setSecondname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    fetch("localhost:7000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname,secondname, email, password }),
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
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
        <div className="form-group">
          {/* <label htmlFor="fullname" className="form-label">
            Full name:
          </label> */}
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            name="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="form-input-1"
            autoComplete="off"
          />

            <input
            type="text"
            id="secondename"
            placeholder="Seconde Name"
            name="Secondename"
            value={secondname}
            onChange={(e) => setSecondname(e.target.value)}
            required
            className="form-input-1"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="username" className="form-label">
            Username:
          </label> */}
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="password" className="form-label">
            Password:
          </label> */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="form-button">
          Register
        </button>
        <div className="register-links">
        <p className="login-link-p">Don't have an account?
          <a href="/login" className="login-link">
          Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};
