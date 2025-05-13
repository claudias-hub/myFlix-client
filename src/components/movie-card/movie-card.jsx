// components/movie-card/movie-card.jsx
import React from 'react';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{movie.title}</h3>
      <img src={movie.imageURL} alt={movie.title} style={{ width: '200px' }} />
    </div>
  );
};
