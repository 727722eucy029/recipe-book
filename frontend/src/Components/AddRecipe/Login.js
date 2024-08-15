import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import logo from '../Pictures/logo-black.png';

const Login = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    pass: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSign = () => {
    nav("/Signup");
  };

  const handleadm = () => {
    nav("/AdmLogin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, pass } = formData;
    
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      const user = response.data.find(user => user.userName === userName);
      
      if (user) {
        if (user.pass === pass) {
          setSuccess('Login successful!');
          nav("/AddRecipe");
        } else {
          setError('Invalid username or password');
          setSuccess(false);
        }
      } else {
        setSuccess(false);
        setError('User not found');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div id="firstimg">
      <div>
        <h2>KITCHEN CHRONICLES</h2>
      </div>
      <form onSubmit={handleSubmit} className='log'>
        <div>
          <h1>Login</h1>
          <label>
            Username
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="action-buttonlo">Login</button>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={handleSign} className="action-button">Not a member? Sign up now</button>
      <button onClick={handleadm} className="action-button">Admin</button>
    </div>
  );
};

export default Login;
