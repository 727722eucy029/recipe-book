import React, { useState } from 'react';
import './Appbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Pictures/logo-black.png';

function Appbar({ onSearch, searchQuery }) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      navigate('/ViewRecipe');
    } else {
      onSearch(value);
      navigate('/search');
    }
  };

  return (
    <div className="app-bar">
      <div className="nav">
        <img src={logo} alt="Kitchen Chronicles Logo" className="logo" />
        <div className="nav-text">
          <h2>KITCHEN CHRONICLES</h2>
          <p>The Recipe Book</p>
        </div>
      </div>
      <div className="search">
        <input 
          type="text" 
          placeholder="Find a recipe..." 
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn">Q</button>
      </div>
      <div className="auth">
        To upload your recipes and explore a world of flavors!
        <a href="/Login">Login</a>
      </div>
    </div>
  );
}

export default Appbar;
