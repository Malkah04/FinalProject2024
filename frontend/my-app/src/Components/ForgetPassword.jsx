import React from 'react'
import { useState } from 'react'
import "./forgetPassword.css"

 function ForgetPassword() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:7000/forgetpassword", {
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
          
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle login error here
        });
    };
  return (
    <div className="forgetpassword-container">
    <h1 className="forgetpassword-title">Forget Password</h1>
    <form className="forgetpassword-form" onSubmit={handleSubmit}>
        <div className="forgetpassword-group">
            
            {/* <label htmlFor="username" className="form-label">Username:</label> */}
        
            <input
                type="text"
                id="email"
                placeholder="email"
                name="email"
                className="formforgetpassword-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
           {/* <i class="fa-solid fa-user"></i> */}
        </div>
        <div className="formforgetpassword-group">
            {/* <label htmlFor="password" className="form-label">Password:</label> */}
            <input
                type="password"
                id="newpassword"
                placeholder="New password"
                name="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

        </div>
        <div className="formforgetpassword-group">
            {/* <label htmlFor="password" className="form-label">Password:</label> */}
            <input
                type="password"
                id="password"
                placeholder="Confirm new password"
                name="password"
                className="formforgetpassword-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

        </div>
        <button type="submit" className="forgetpassword-button">Change Password</button>
        <div className="forgetpassword-strength">
           <p className="forgetpassword-strength-p"> Use at least 8 character </p>
           <p className="forgetpassword-strength-p"> Password must contain upper case letters </p>
           <p className="forgetpassword-strength-p"> Password must contain letters and digits</p>
        </div>
    </form>
</div>
);
  
}

export default ForgetPassword;