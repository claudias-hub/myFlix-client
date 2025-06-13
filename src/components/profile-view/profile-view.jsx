import React, { useEffect, useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ user, token, movies, onLoggedOut, setUser }) => {
  if (!user) return <div>Loading...</div>;

  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [birthday, setBirthday] = useState(user.birthday ? user.birthday.split("T")[0] : "");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.favoriteMovies) {
      setFavoriteMovies(
        movies.filter((movie) => user.favoriteMovies.includes(movie._id))
      );
    }
  }, [user, movies]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://movie-api-w67x.onrender.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error("Failed to update profile");
        }
      })
      .then((updatedUser) => {
        setUsername(updatedUser.username || "");
        setEmail(updatedUser.email || "");
        setBirthday(updatedUser.birthday ? updatedUser.birthday.split("T")[0] : "");
        setPassword(""); 
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update profile.");
      });
  };

  const handleDeregister = () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    fetch(`https://movie-api-w67x.onrender.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully.");
          onLoggedOut(); // clear localStorage, navigate to login
        } else {
          alert("Failed to delete account.");
        }
      })
      .catch((error) => console.error(error));
  };

  const removeFavorite = (movieId) => {
    fetch(
      `https://movie-api-w67x.onrender.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not remove favorite movie.");
        }
      })
      .then((updatedUser) => {
      // Actualizar tanto el estado local como el usuario principal
      setFavoriteMovies(favoriteMovies.filter((m) => m._id !== movieId));
      setUser(updatedUser); // Actualizar el usuario completo
    })
    .catch((error) => {
      console.error(error);
      alert("Could not remove favorite movie.");
    });
  };

  return (
    <div className="container mt-4">
      <h2>Profile Details</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="me-2">
          Update Profile
        </Button>
        <Button variant="danger" onClick={handleDeregister}>
          Delete Account
        </Button>
      </Form>

      <hr />
      <h4>Favorite Movies</h4>
      <Row>
        {favoriteMovies.length === 0 && <p>You have no favorite movies.</p>}
        {favoriteMovies.map((movie) => (
          <Col md={4} key={movie._id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={movie.imageURL} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button
                  variant="outline-danger"
                  onClick={() => removeFavorite(movie._id)}
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
