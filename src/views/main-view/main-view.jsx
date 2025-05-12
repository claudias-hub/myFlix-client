import React, { useState } from 'react';
import { MovieCard } from '../../components/movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';

export const MainView = () => {
  console.log("MainView rendered"); // ✅

  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    {
      Title: 'Inception',
      Description: 'A mind-bending thriller...',
      ImagePath: 'https://m.media-amazon.com/images/I/51NbVEuw1HL._AC_.jpg',
      Genre: { Name: 'Sci-Fi' },
      Director: { Name: 'Christopher Nolan' }
    },
    {
      Title: 'Interstellar',
      Description: 'Journey through space and time.',
      ImagePath: 'https://m.media-amazon.com/images/I/71n58V4zH-L._AC_SY679_.jpg',
      Genre: { Name: 'Sci-Fi' },
      Director: { Name: 'Christopher Nolan' }
    },
    {
      Title: 'The Matrix',
      Description: 'Reality is an illusion.',
      ImagePath: 'https://m.media-amazon.com/images/I/51EG732BV3L.jpg',
      Genre: { Name: 'Action' },
      Director: { Name: 'The Wachowskis' }
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
          key={movie.Title}
          movie={movie}
          onMovieClick={(movie) => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
