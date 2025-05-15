import React from 'react';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)} style={{ border: '1px solid black', margin: '10px', padding: '10px', cursor: 'pointer',
      maxWidth: '300px' }}>
      <h3>{movie.title}</h3>
      {/*<img src={movie.imageURL} alt={movie.title} style={{ width: '200px' }} />*/}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
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
  onMovieClick: PropTypes.func.isRequired
};