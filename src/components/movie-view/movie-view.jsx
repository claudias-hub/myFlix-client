import React from 'react';
import PropTypes from 'prop-types';


export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.imageURL} alt={movie.title} style={{ width: '200px' }} />
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre.name}</p>
      <p><strong>Director:</strong> {movie.director.name}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
