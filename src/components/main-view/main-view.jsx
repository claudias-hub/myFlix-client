import React, { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

export const MainView = ({ user, token, onLoggedOut, setUser }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [directorFilter, setDirectorFilter] = useState("");

  useEffect(() => {
    fetch("https://movie-api-w67x.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, [token]);

  // If no user is logged in, show login and signup
  if (!user) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <p>You must be logged in to view movies.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter ? movie.genre.name === genreFilter : true;
    const matchesDirector = directorFilter ? movie.director.name === directorFilter : true;
    return matchesTitle && matchesGenre && matchesDirector;
  });

  // If user is logged in, show movies and logout button
  return (
    <div className="main-view">
      <Button variant="danger" onClick={onLoggedOut} className="logout-button">
        Logout
      </Button>

      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      <select
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
        className="form-select mb-3"
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        {/* Add more as needed */}
      </select>

      <select
        value={directorFilter}
        onChange={(e) => setDirectorFilter(e.target.value)}
        className="form-select mb-3"
      >
        <option value="">All Directors</option>
        <option value="Christopher Nolan">Christopher Nolan</option>
        <option value="Quentin Tarantino">Quentin Tarantino</option>
        {/* Add more as needed */}
      </select>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading movies...</p>
        </div>
      ) : (
        <Row>
          {filteredMovies.map((movie) => (
            <Col key={movie._id} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                favoriteMovieIds={user?.FavoriteMovies || []}
                user={user}
                token={token}
                setUser={setUser}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
