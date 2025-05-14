import React, { useState, useEffect } from 'react';
import { MovieCard } from '../../components/movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import PropTypes from 'prop-types';


export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://movie-api-w67x.onrender.com/movies") // ✅ Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div>
      <h1>Movie List</h1>
      {movies.length === 0 ? (
        <p>The list is empty!</p>
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie._id} // or movie.title if _id doesn't exist
            movie={movie}
            onMovieClick={(movie) => setSelectedMovie(movie)}
          />
        ))
      )}
    </div>
  );
};