import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { HeartFill } from 'react-bootstrap-icons';

export const MovieCard = ({ movie, favoriteMovieIds = [] }) => {
  const isFavorite = favoriteMovieIds.includes(movie._id);

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {movie.Title}
          {isFavorite && (
            <HeartFill color="red" title="Favorite" />
          )}
        </Card.Title>
        
        {/* This button links to the movie detail route */}
        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number
    })
  }).isRequired,
  favoriteMovieIds: PropTypes.arrayOf(PropTypes.string)
};
