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
      genre: {
        name: 'Sci-Fi',
        description: 'Science fiction genre involving futuristic elements.'
      },
      director: {
        name: 'Christopher Nolan',
        bio: 'British-American filmmaker known for complex storytelling.',
        birthYear: 1970,
        deathYear: null
      },
      featured: true
    },
    {
      title: 'Interstellar',
      description: 'Journey through space and time.',
      imageURL: 'https://m.media-amazon.com/images/I/71n58V4zH-L._AC_SY679_.jpg',
      genre: {
        name: 'Sci-Fi',
        description: 'Science fiction genre involving astronauts and time traveling.'
      },
      director: {
        name: 'Christopher Nolan',
        bio: 'British-American filmmaker known for complex storytelling.',
        birthYear: 1970,
        deathYear: null
      },
      featured: true
    },
    {
      title: 'The Matrix',
      description: 'Reality is an illusion.',
      imageURL: 'https://m.media-amazon.com/images/I/51EG732BV3L.jpg',
      genre: {
        name: 'Action',
        description: 'Science fiction genre involving virtual reality.'
      },
      director: {
        name: 'The Wachowskis',
        bio: 'American film and television directors, writers and producers',
        birthYear: 1965,
        deathYear: null
      },
      featured: true
    },
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
