import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddRecipe.css';
import Appbar from '../ViewRecipe/Appbar';
import axios from 'axios';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [recipeId, setRecipeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Add state for success message

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('scroll');
    return () => {
      document.body.classList.remove('scroll');
    };
  }, []);

  useEffect(() => {
    if (location.state && location.state.recipe) {
      const { id, title, description, ingredients, instruction, image, img, category } = location.state.recipe;
      setRecipeId(id);
      setTitle(title);
      setDescription(description);
      setIngredients(ingredients);
      setInstruction(instruction);
      setImage(image);
      setImg(img);
      setCategory(category);
    }
  }, [location.state]);

  useEffect(() => {
    if (isSubmitted) {
      setSuccessMessage('Recipe submitted successfully!');
      setTimeout(() => {
        navigate('/ViewRecipe');
      }, 2000); // Wait for 2 seconds before navigating
    }
  }, [isSubmitted, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
    if (name === 'ingredients') setIngredients(value);
    if (name === 'instruction') setInstruction(value);
    if (name === 'image') setImage(value);
    if (name === 'img') setImg(value);
    if (name === 'category') setCategory(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recipeId) {
        const response = await axios.put(`http://localhost:8080/api/recipe/${recipeId}`, {
          title,
          description,
          ingredients,
          instruction,
          image,
          img,
          category
        });
        if (response.status === 200) {
          setIsSubmitted(true);
        } else {
          setErrors({ apiError: 'Server error occurred' });
        }
      } else {
        const response = await axios.post('http://localhost:8080/api/recipe', {
          title,
          description,
          ingredients,
          instruction,
          image,
          img,
          category
        });
        if (response.status === 200 || response.status === 201) {
          setIsSubmitted(true);
        } else {
          setErrors({ apiError: 'Server error occurred' });
        }
      }
    } catch (error) {
      setErrors({ apiError: 'An error occurred while submitting the recipe.' });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
     
      <div className="container">
        <h1>{recipeId ? 'Edit Recipe' : 'Add Your Recipe'}</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="formGroup">
            <label className="label">Description (minimum 15 characters)</label>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              required
              className="textarea"
            />
          </div>
          <div className="formGroup">
            <label className="label">Ingredients</label>
            <textarea
              name="ingredients"
              value={ingredients}
              onChange={handleChange}
              required
              className="textarea"
            />
          </div>
          <div className="formGroup">
            <label className="label">Instructions</label>
            <textarea
              name="instruction"
              value={instruction}
              onChange={handleChange}
              required
              className="textarea"
            />
          </div>
          {/* <div className="formGroup">
            <label className="label">Video</label>
            <textarea
              name="image"
              value={image}
              onChange={handleChange}
              required
              className="textarea"
            />
          </div>
          <div className="formGroup">
            <label className="label">Image</label>
            <textarea
              name="img"
              value={img}
              onChange={handleChange}
              required
              className="textarea"
            />
          </div> */}
          <div className="formGroup">
            <label className="label">Category</label>
            <select
              name="category"
              value={category}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Select Category</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Beverages">Beverages</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
          {errors.apiError && <p className="error">{errors.apiError}</p>}
          {successMessage && <p className="success">{successMessage}</p>} {/* Success message */}
          <div className="buttonContainer">
            <button type="submit" className="submitButton">
              {recipeId ? 'Update' : 'Submit'}
            </button>
            <button type="button" onClick={handleBack} className="arbackButton" >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
