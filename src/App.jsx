import React, { useState, useEffect } from "react";
import { MainView } from "./components/main-view/main-view";
import { LoginView } from "./components/login-view/login-view";
import { SignupView } from "./components/signup-view/signup-view";
import { MovieView } from "./components/movie-view/movie-view";
import { ProfileView } from "./components/profile-view/profile-view";
import { NavigationBar } from "./components/navigation-bar/navigation-bar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from 'react-bootstrap';

const App = () => {
  const isValidUser = (user) => {
    return user && 
    typeof user.username === "string" && 
    typeof user.email === "string" &&
    typeof user._id === "string" &&
    typeof user.birthday === "string"
  };

  const storedUser = (() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return isValidUser(user) ? user : null;
    } catch {
      return null;
    }
  })();

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };
  
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [movies, setMovies] = useState([]);

  // Fetch movies when token is available
  useEffect(() => {
    if (!token) return;
    console.log("Token actual:", token);

    fetch(`https://movie-api-w67x.onrender.com/movies`, {
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

  const onLoggedIn = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {
    const prevUser = JSON.parse(localStorage.getItem("user"));
    const username = prevUser?.username || "";
    const password = ""; //better empty-security

    setUser(null);
    setToken(null);
    localStorage.clear();

    navigate("/login", { state: { username: username, password: password } });
  };


  return (
    <Container fluid className="px-2 px-md-3">
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MainView
                user={user}
                token={token}
                movies={movies}
                onLoggedOut={handleLogout}
                setUser={setUser}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            user ? (
              <MovieView 
                user={user} 
                token={token}
                onUserUpdate={updateUser}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView
                user={user}
                token={token}
                movies={movies} // asegúrate de pasar el array correcto de películas
                onLoggedOut={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<LoginView onLoggedIn={onLoggedIn} />} />
        <Route path="/signup" element={<SignupView />} />
      </Routes>
    </Container>
  );
};

export default App;
