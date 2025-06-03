import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Heart, HeartFill } from 'react-bootstrap-icons';

export const MovieCard = ({ movie, favoriteMovieIds, user, token, setUser }) => {
  const isFavorite = (favoriteMovieIds || []).includes(movie._id);

  const toggleFavorite = () => {
    const url = `https://movie-api-w67x.onrender.com/users/${user.Username}/movies/${movie._id}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update favorites');
        }
        return response.json();
      })
      .then((updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong updating favorites.');
      });
  };


  return (
    <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card.Img
        variant="top"
        src={movie.imageURL}
      />

      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>{movie.title}</span>
          <span
            onClick={(e) => {
              e.preventDefault(); // evita que se active el link
              e.stopPropagation(); // evita que se propague hacia el Link
              toggleFavorite();
            }}
            style={{ cursor: 'pointer' }}
          >
            {isFavorite ? <HeartFill color="red" /> : <Heart color="gray" />}
          </span>

        </Card.Title>
        <Button variant="primary" className="mt-2">Details</Button>
      </Card.Body>
    </Link>

  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imagePath: PropTypes.string,
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
  favoriteMovieIds: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};
