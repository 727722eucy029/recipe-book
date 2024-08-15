import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../Pictures/first.jpg';
import './Firstpg.css';

const EnrollmentForm = () => {
  const [view, setView] = useState('home'); // 'home', 'viewRecipe', 'addRecipe'
  const navigate = useNavigate();

  useEffect(() => {
    // Add the no-scroll class to body when the component mounts
    document.body.classList.add('no-scroll');

    // Remove the no-scroll class from body when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleView = () => {
    navigate('ViewRecipe');
  };

  const handleAddRecipe = () => {
    navigate('Login');
  };

  const handleBack = () => {
    setView('home');
  };

  return (
    <div id="firstimg2" style={{ backgroundImage: `url(${img1})` }}>
      <h1>KITCHEN CHRONICLES</h1>
      <h3>THE RECIPE BOOK</h3>
      <div>
        <button onClick={handleView}><h1>View Recipe</h1></button>
        <button onClick={handleAddRecipe}><h1>Add your recipe</h1></button>
      </div>
    </div>
  );
};

export default EnrollmentForm;
