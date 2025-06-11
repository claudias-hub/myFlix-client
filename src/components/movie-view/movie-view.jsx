import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Row, Col, Button, Card } from "react-bootstrap";

export const MovieView = ({ token, user, setUser }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://movie-api-w67x.onrender.com/movies/id/${movieId}`, {
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
    <Card className="p-3">
      <Row>
        <Col md={4} className="text-center">
          <Card.Img
            variant="top"
            src={movie.imageURL || "https://via.placeholder.com/300x450?text=No+Image"}
            alt={`${movie.title} poster`}
            className="small-poster"
          />
        </Col>

        <Col>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Card.Text><strong>Genre:</strong> {movie.genre?.name}</Card.Text>
            <Card.Text><strong>Director:</strong> {movie.director?.name}</Card.Text>
            <Button
              onClick={() => {
                console.log("=== DEBUGGING ADD TO FAVORITES ===");
                console.log("Username:", user.username);
                console.log("User object completo:", user);
                console.log("Movie ID:", movie._id);
                console.log("Movie object completo:", movie);
                
                const url = `https://movie-api-w67x.onrender.com/users/${user.username}/movies/${movie._id}`;
                console.log("URL que voy a usar:", url);
                console.log("=== FIN DEBUGGING ===");

                fetch(`https://movie-api-w67x.onrender.com/users/${user.username}/movies/${movie._id}`, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                })
                  .then((response) => {
                    console.log("Respuesta del servidor:", response.status);
                    if (!response.ok) {
                      throw new Error(`Error adding to favorites: ${response.status}`);
                    }
                    return response.json();
                  })
                  .then((updatedUser) => {
                    console.log("Updated user:", updatedUser);
                    setUser(updatedUser);
                    alert("Movie added to favorites!");
                  })
                  .catch((err) => {
                    console.error("Error completo:", err);
                  });
              }}
              variant="primary"
              className="me-2"
            >
              Add to Favorites
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              className="me-2"
            >
              Back
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

MovieView.propTypes = {
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};
