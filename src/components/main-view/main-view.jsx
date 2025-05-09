import React, { useState } from 'react';
import { MovieCard } from '../../components/movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';

export const MainView = () => {
  const [movies] = useState([
    {
      id: 1,
      title: 'Inception',
      description: 'A thief enters dreams to steal secrets.',
      image: 'https://via.placeholder.com/200',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan'
    },
    {
      id: 2,
      title: 'Interstellar',
      description: 'Explorers travel through a wormhole.',
      image: 'https://via.placeholder.com/200',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan'
    },
    {
      id: 3,
      title: 'The Matrix',
      description: 'A hacker discovers a simulated reality.',
      image: 'https://via.placeholder.com/200',
      genre: 'Action',
      director: 'The Wachowskis'
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={(movie) => setSelectedMovie(movie)} />
      ))}
    </div>
  );
};
