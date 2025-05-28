import React, { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies when token is available
  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-w67x.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error("Failed to fetch movies:", error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // If no user is logged in, show login and signup
  if (!user) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
              }}
            />
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // If user is logged in, show movies and logout button
  return (
    <div className="main-view">
      <Button variant="danger" onClick={handleLogout} className="logout-button">
        Logout
      </Button>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} onMovieClick={setSelectedMovie} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
