import React, { useState, useEffect, useRef } from 'react';
import './Validation.css';
import { useNavigate } from 'react-router-dom';
import RecipeModal from './RecipeModal';
import axios from 'axios';

const Validation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recipe');
        const recipes = response.data;
        setRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const generateThumbnails = () => {
      recipes.forEach((recipe) => {
        const video = document.createElement('video');
        video.src = recipe.video;
        video.crossOrigin = 'anonymous';

        video.addEventListener('loadeddata', () => {
          if (video.readyState >= 2) {
            video.currentTime = 1;
          }
        });

        video.addEventListener('seeked', () => {
          if (video.readyState >= 2) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL('image/png');
            setThumbnails((prevThumbnails) => ({
              ...prevThumbnails,
              [recipe.id]: thumbnail,
            }));
          }
        });

        video.addEventListener('error', (e) => {
          console.error(`Error loading video for recipe ${recipe.title}:`, e);
        });

        video.addEventListener('canplaythrough', () => {
          if (video.readyState >= 2) {
            video.currentTime = 1;
          }
        });
      });
    };

    if (recipes.length > 0) {
      generateThumbnails();
    }
  }, [recipes]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video is playing');
            })
            .catch((error) => {
              console.error('Error playing video:', error);
            });
        }
      }
    });
  }, [recipes]);

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
    navigate('/breakfast');
  };

  const handleApprove = async (recipeId, event) => {
    event.stopPropagation(); // Prevent the modal from opening
    try {
      const updatedRecipe = {
        ...recipes.find((recipe) => recipe.id === recipeId),
        status: 1,
      };

      await axios.put(`http://localhost:8080/api/recipe/${recipeId}`, updatedRecipe);
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, status: 1 } : recipe
        )
      );
      setSuccessMessage('Recipe approved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Failed to approve recipe:', error);
    }
  };

  const handleEdit = (recipe, event) => {
    event.stopPropagation(); // Prevent the modal from opening
    navigate('/AddRecipe', { state: { recipe } });
  };

  // Sort recipes: those needing approval first, then the approved ones
  const sortedRecipes = [...recipes].sort((a, b) => a.status - b.status);

  return (
    <>
      <div>
        <h1>ADMIN PAGE</h1>
      </div>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <div className="recipe-container">
        {sortedRecipes.map((recipe, index) => (
          <div
            className="recipe-card"
            key={index}
            onClick={() => handleRecipeClick(recipe)}
          >
            <img src={`${recipe.img}`} className="rimg" />
            <div className="recipe-details">
              <h2>{recipe.title}</h2>
              <h3>Description:</h3>
              <p>{recipe.description}</p>
              <div className="button-container">
                {recipe.status !== 1 && (
                  <button
                    onClick={(event) => handleApprove(recipe.id, event)}
                    id="buttonapprove"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={(event) => handleEdit(recipe, event)}
                  id="buttonedit"
                  style={{ marginTop: '10px' }}
                >
                  Edit Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="backButtonContainer">
        <button onClick={handleBack} className="backButton">
          Back
        </button>
      </div>

      {isModalOpen && selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Validation;
