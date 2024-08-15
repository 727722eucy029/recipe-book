import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from './Appbar';
import styles from './ViewRecipe.module.css'; // Ensure the path is correct

import vegpic from '../Pictures/vegpic.jpg';
import nonvegpic from '../Pictures/nonvegpic.jpg';
import desserts1 from '../Pictures/dessertspic.jpg';
import beverages from '../Pictures/bevpic.jpg';
import ho1 from '../Pictures/ho1.jpg';
import ho2 from '../Pictures/ho2.jpg';
import ho3 from '../Pictures/ho3.jpg';
import ho4 from '../Pictures/ho4.jpg';

const recipes = [
  { id: 1, title: 'Breakfast', img: vegpic, head: 'Veg Meals' },
  { id: 2, title: 'Lunch',  img: nonvegpic, head: 'Non-veg Meals' },
  { id: 3, title: 'Snacks',  img: desserts1, head: 'Desserts' },
  { id: 4, title: 'Dinner',  img: beverages, head: 'Beverages' }
];

const homeImages = [ho1, ho2, ho3, ho4];

const ViewRecipe = () => {
  const navigate = useNavigate();
  const [currentHomeImage, setCurrentHomeImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHomeImage((prevIndex) => (prevIndex + 1) % homeImages.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleCardClick = (title) => {
    navigate(`/recipe/${title.toLowerCase()}`);
  };

  return (
    <div className={styles.home}>
     
      <div className={styles.homeContainer}>
        <div className={styles.homeImage} style={{ backgroundImage: `url(${homeImages[currentHomeImage]})` }} />
      </div>
      <div className={styles.container}>
        <h2 style={{ marginTop: '10px' }}>KITCHEN CHRONICLES</h2>
        <div className={styles.recipeList}>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => handleCardClick(recipe.title)}
              className={styles.recipeCard}
            >
              <div className={styles.recipeImage} style={{ backgroundImage: `url(${recipe.img})`}} />
              <h3>{recipe.head}</h3>
            </div>
          ))}
        </div>
        <button onClick={handleBack} className={styles.backButton}>Back</button>
      </div>
    </div>
  );
};

export default ViewRecipe;
