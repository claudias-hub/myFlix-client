import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ token }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    console.log('movieId:', movieId);      
    console.log('token:', token);

    fetch(`https://movie-api-w67x.onrender.com/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setMovie(data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [movieId, token]);

  if (!movie) return <div>Loading movie...</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '400px', margin: 'auto' }}>
      <h2>{movie.title}</h2>
      <img
        src={movie.imageURL}
        alt={movie.title}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <p><strong>Description:</strong> {movie.description || 'No description available.'}</p>
      <p><strong>Genre:</strong> {movie.genre?.name || 'Unknown genre'}</p>
      <p><strong>Director:</strong> {movie.director?.name || 'Unknown director'}</p>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>

  );
};

MovieView.propTypes = {
  token: PropTypes.string.isRequired
};
