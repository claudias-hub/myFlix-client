import React, { useState } from 'react';
// import './signup-view.scss';             // Opcional: si planeas añadir estilos

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://movie-api-w67x.onrender.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email
      })
    })
      .then((res) => {
        if (res.ok) {
          setMessage('Signup successful! You can now log in.');
          // Clear inputs (optional)
          setUsername('');
          setPassword('');
          setEmail('');
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || 'Signup failed.');
          });
        }
      })
      .catch((err) => {
        setMessage(err.message || 'Signup failed.');
      });
  };

  return (
    <div className="signup-view">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          minLength={3}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength={6}
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
