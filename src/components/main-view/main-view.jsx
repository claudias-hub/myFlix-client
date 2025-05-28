import React, { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieCard } from '../movie-card/movie-card'; 
//import './main-view.scss';                               // Opcional: si planeas añadir estilos

export const MainView = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);

  // Fetch movies when token is available
  useEffect(() => {
    if (!token) return;

    fetch('https://movie-api-w67x.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Failed to fetch movies:', error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // If no user is logged in, show login and signup
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
          }}
        />
        <SignupView />
      </>
    );
  }

  // If user is logged in, show movies and logout button
  return (
    <div className="main-view">
      <button onClick={handleLogout}>Logout</button>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
