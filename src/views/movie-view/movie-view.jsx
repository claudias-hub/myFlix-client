import React from 'react';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h2>{movie.Title}</h2>
      <img src={movie.ImagePath} alt={movie.Title} style={{ width: '200px' }} />
      <p><strong>Description:</strong> {movie.Description}</p>
      <p><strong>Genre:</strong> {movie.Genre.Name}</p>
      <p><strong>Director:</strong> {movie.Director.Name}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
