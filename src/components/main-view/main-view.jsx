import React, { useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MainView = ({ user, token, movies, onLoggedOut, setUser }) => {

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
  
  // If user is logged in, show movies and logout button
  return (
    <div className="main-view">
      <Button variant="danger" onClick={onLoggedOut} className="logout-button">
        Logout
      </Button>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <Row>
          {movies.map((movie) => (
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
