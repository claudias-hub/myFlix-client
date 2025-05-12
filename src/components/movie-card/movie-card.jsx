// components/movie-card/movie-card.jsx
import React from 'react';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{movie.Title}</h3>
      <img src={movie.ImagePath} alt={movie.Title} style={{ width: '200px' }} />
    </div>
  );
};
