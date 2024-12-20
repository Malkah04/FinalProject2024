import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null); 
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7000/user", {
        method: "GET", 
    })
      .then((response) => response.json()) 
      .then((data) => {
        setUser(data); 
        setUpdatedUser(data); 
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:7000/user", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(updatedUser), 
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data); 
        setEditMode(false); 
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <p>Loading...</p>; // عرض "Loading..." عند تحميل البيانات
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      {!editMode ? (
        <div className="profile-view">
          <p className="profile-info">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="profile-info">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="profile-info">
            <strong>ID:</strong> {user.id} {/* تم تغيير bio إلى ID */}
          </p>
          <button
            className="profile-button edit-button"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
          <Link to="/login" className="profile-button logout-button">
            Logout
          </Link>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={updatedUser.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={updatedUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="id" className="form-label"> {}
              ID:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              className="form-input"
              value={updatedUser.id}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="profile-button save-button">
            Save
          </button>
          <button
            type="button"
            className="profile-button cancel-button"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
