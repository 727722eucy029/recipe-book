import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import img1 from '../Pictures/first.jpg';

const Signup = () => {
  const nav = useNavigate();
  //used to set form data
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    pass: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleChange = (e) => {
    //used to handle change
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    //used for form validation
    const newErrors = {};
    if (!formData.userName) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.pass) newErrors.password = 'Password is required';
    if (formData.pass!== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    //if (formData.email && !formData.email.includes('@business.com')) newErrors.email = 'Only business emails are allowed';
    return newErrors;
  };

  const handleSub = async (e) => {
    //handling form submit
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      //fetching data from database
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowMessage(true);
        setFormData({
          userName: '',
          email: '',
          pass: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          setShowMessage(false);
          nav('/AddRecipe');
        }, 3000);
      } else {
        const data = await response.json();
        setErrors({ apiError: data.message });
      }
    } catch (error) {
      // setErrors({ apiError: 'An error occurred' });
    }
  };

  const handleBack = () => {
    //handling navigation to the previous page
    nav('/Login');
  };

  return (
    <div id="firstimg1" >
  
      {/*form for signup page*/}
      <form id="formmm" onSubmit={handleSub}>
        <div className='sgnup'>
          <h1>Sign Up</h1>
          <label>
            Username
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
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
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </label>
        </div>
        <button type="submit" id="btn">Sign Up</button>
        {showMessage && <p className="success">Signup successful!</p>}
        {errors.apiError && <p className="error">{errors.apiError}</p>}
      </form>
      <button onClick={handleBack} id="loginbt" style={{backgroundColor: '#333'}}>Already a member? Login</button>
    </div>
  );
};

export default Signup;
