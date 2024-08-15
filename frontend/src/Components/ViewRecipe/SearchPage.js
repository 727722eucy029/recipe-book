import React, { useState, useEffect } from 'react';
import './Beverages/Dinner.css';
import { useNavigate } from 'react-router-dom';
import RecipeModal from './Beverages/RecipeModal';
import axios from 'axios';

const SearchPage = ({ searchQuery }) => {
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

  // Filter recipes based on search query
  const approvedRecipes = recipes
    .filter(recipe => recipe.status === 1)
    .filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      // Sort by relevance (exact match first)
      const aStartsWith = a.title.toLowerCase().startsWith(searchQuery.toLowerCase());
      const bStartsWith = b.title.toLowerCase().startsWith(searchQuery.toLowerCase());
      return bStartsWith - aStartsWith; // Exact matches first
    });

  return (
    <>
     
      <div className="recipe-container">
        {approvedRecipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          approvedRecipes.map((recipe, index) => (
            <div
              className="recipe-card"
              key={index}
              onClick={() => handleRecipeClick(recipe)}
            >
              <img src={recipe.img} className='rimg' alt={recipe.title} />
              <div className="recipe-details">
                <h3>{recipe.title}</h3>
                <p>Description: {recipe.description}</p>
              </div>
            </div>
          ))
        )}
      
      <div style={{ clear: 'both', width: '100%', textAlign: 'center', marginTop: '20px' }}>
  <button 
    onClick={handleBack} 
    className="backButton" 
    style={{ 
      width: '20%',  // Reduced width
      textAlign: 'center',
      marginLeft:'40%'
    }}
  >
    Back
  </button>
</div>

      </div>

      {isModalOpen && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default SearchPage;
