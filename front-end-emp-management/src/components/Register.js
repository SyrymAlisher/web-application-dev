import React, { useState } from 'react';
import { register } from '../services/authService';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file

function Register() {
  // const [userData, setUserData] = useState({ username: '', password: '' });

  // const handleChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
});

const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    register(userData)
      .then(response => {
        console.log('Registered successfully', response);
        // Additional registration success logic here
      })
      .catch(error => console.error('Registration error:', error));
  };

  // return (
  //   <div className="register-container">
  //     <h2>Register</h2>
  //     <form onSubmit={handleSubmit} className="register-form">
  //       {/* ... form fields ... */}
  //     </form>
  //     <div className="alternate-action">
  //       <p>Already have an account? <Link to="/login">Login here</Link></p>
  //     </div>
  //   </div>
  // );

  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
            <input name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    </div>
);
}

export default Register;



