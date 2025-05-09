import React from 'react';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} style={{ width: '200px' }} />
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
