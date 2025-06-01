import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


export const MovieView = ({ token }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
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
      <h2>{movie.Iitle}</h2>
      <img src={movie.imagePath} alt={movie.Title} style={{ width: '100%', marginBottom: '10px' }} />
      <p><strong>Description:</strong> {movie.Description}</p>
      <p><strong>Genre:</strong> {movie.Genre.Name}</p>
      <p><strong>Director:</strong> {movie.Director.Name}</p>
      <button onClick={onBackClick}>Back</button>
    </div>

  );
};

MovieView.propTypes = {
  token: PropTypes.string.isRequired
};
