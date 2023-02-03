import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GreatPosts from './img/GreatPosts.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/users');
      const userData = await response.json()
      setUsers(userData);
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
      setError('Incorrect email or password');
      return;
    }


    localStorage.setItem('user', JSON.stringify(user));

    window.location.href = '/home';
  };

  return (
    <div>
      <header>
        <img src={GreatPosts} alt="Logo" />
        <h1>LOGIN</h1>
        <nav>
          <Link to="/">LOGIN</Link>
          <Link to="/register">REGISTER</Link>
        </nav>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          <button type="submit">SUBMIT</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
      <footer>
        Copyright &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Login;
