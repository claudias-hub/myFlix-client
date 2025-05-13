import React, { useState } from 'react';
import { MovieCard } from '../../components/movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';

export const MainView = () => {
  console.log("MainView rendered"); // ✅

  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    {
      title: 'Inception',
      description: 'A mind-bending thriller...',
      imageURL: 'https://m.media-amazon.com/images/I/51NbVEuw1HL._AC_.jpg',
      genre: { name: 'Sci-Fi' },
      director: { name: 'Christopher Nolan' }
    },
    {
      title: 'Interstellar',
      description: 'Journey through space and time.',
      imageURL: 'https://m.media-amazon.com/images/I/71n58V4zH-L._AC_SY679_.jpg',
      genre: { name: 'Sci-Fi' },
      director: { name: 'Christopher Nolan' }
    },
    {
      title: 'The Matrix',
      description: 'Reality is an illusion.',
      imageURL: 'https://m.media-amazon.com/images/I/51EG732BV3L.jpg',
      genre: { name: 'Action' },
      director: { name: 'The Wachowskis' }
    }
  ];

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
