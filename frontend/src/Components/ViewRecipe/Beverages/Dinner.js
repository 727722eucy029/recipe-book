import React, { useState, useEffect } from 'react';
import './Dinner.css';
import { useNavigate } from 'react-router-dom';
import RecipeModal from './RecipeModal';
import axios from 'axios';
import Appbar from '../Appbar';

const Dinner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes from the backend
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recipe'); // Adjust the API endpoint as needed
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleBack = () => {
    navigate('/ViewRecipe');
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    navigate('/ViewRecipe');
  };

  const approvedRecipes = recipes.filter(recipe => recipe.status === 1 && recipe.category === 'Beverages');

  return (
    <>
      <div>
        <h1>BEVERAGES</h1>
      </div>
      <div className="recipe-container">
        {approvedRecipes.map((recipe, index) => (
          <div
            className="recipe-card"
            key={index}
            onClick={() => handleRecipeClick(recipe)}
          >
            <img src={`${recipe.img}`} className="rimg" alt={recipe.title} />
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>Description: {recipe.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}

      <div className="backButtonContainer">
        <button onClick={handleBack} className="backButton">
          Back
        </button>
      </div>
    </>
  );
};

export default Dinner;