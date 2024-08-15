// src/App.js
import React from 'react';
import RecipeCard from './Breakfast';


const recipes = [
//   {
//     image: 'https://linktoimage1.com',
//     title: 'Classic Buttery Mash With Meatballs And Mustard Butter Sauce',
//     rating: '4.5'
//   },
//   {
//     image: 'https://linktoimage2.com',
//     title: 'Tikka Masala',
//     rating: 'No votes yet'
//   },
//   {
//     image: 'https://linktoimage3.com',
//     title: 'Cheesy Buttery Potato Mash With Sausage In Onion Gravy',
//     rating: '4.4'
//   },
//   {
//     image: 'https://linktoimage4.com',
//     title: 'Slow Cooker Butter Chicken Lasagne',
//     rating: '4.8'
//   }
];

const Mainpg = () => {
  return (
    <div >
      <h1>Recipe Book</h1>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            image={recipe.image}
            title={recipe.title}
            rating={recipe.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Mainpg;
