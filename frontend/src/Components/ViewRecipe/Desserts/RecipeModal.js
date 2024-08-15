import React from 'react';
import './RecipeModal.css';
import { useNavigate } from 'react-router-dom';

const RecipeModal = ({ recipe, onClose }) => {
  const navigate = useNavigate();
  const { image, title, rating, ingredients, instruction } = recipe;

  const handleClose = () => {
    console.log('Close button clicked');
    onClose();
    navigate('');
  };

  const formatText = (text, delimiter = '.') => {
    return text.split(delimiter).filter(Boolean).map((sentence, index) => (
      <li key={index}>{sentence.trim()}.</li>
    ));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>&times;</span>
        {image ? (
          <video controls className="modal-video">
            <source src={image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={image} alt={title} className="modal-image" />
        )}
        <h2>{title}</h2>
        <div>
          <strong>Ingredients:</strong>
          <ul className="formatted-list">
            {formatText(ingredients, ',')}
          </ul>
        </div>
        <div>
          <strong>Instructions:</strong>
          <ul className="formatted-list">
            {formatText(instruction)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
