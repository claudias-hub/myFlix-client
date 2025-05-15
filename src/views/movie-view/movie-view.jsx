import React from 'react';
import PropTypes from 'prop-types';


export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '400px', margin: 'auto' }}>
      <h2>{movie.title}</h2>
      <img src={movie.imageURL} alt={movie.title} style={{ width: '100%', marginBottom: '10px' }} />
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre.name}</p>
      <p><strong>Director:</strong> {movie.director.name}</p>
      <button onClick={onBackClick}>Back</button>
    </div>

  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthYear: PropTypes.number,
      deathYear: PropTypes.number
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
