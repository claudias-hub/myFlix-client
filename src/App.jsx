import React, { useState, useEffect } from "react";
import { MainView } from "./components/main-view/main-view";
import { LoginView } from "./components/login-view/login-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const onLoggedIn = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MainView user={user} token={token} onLoggedOut={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginView onLoggedIn={onLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
