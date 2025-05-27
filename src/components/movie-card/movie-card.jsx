import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="h-100"
      onClick={() => onMovieClick(movie)}
      style={{ cursor: 'pointer' }}
    >
      {/* Optional: Display image if available */}
      {/* <Card.Img variant="top" src={movie.imageURL} alt={movie.title} /> */}

      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        {/* Optional: Add a short description or genre */}
        {/* <Card.Text>{movie.description?.slice(0, 100)}...</Card.Text> */}
      </Card.Body>
    </Card>
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