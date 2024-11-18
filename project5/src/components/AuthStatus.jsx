import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logout } from '../store/slices/authSlice';

const AuthStatus = () => {

  const dispatch = useDispatch();
  const {isAuthenticated, user, error} = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({username: '', password: ''});

  const handleChange = e => {
    const {name, value} = e.target;
    setCredentials((prev) => ({...prev, [name]: value}));
  };

  const handleLogin = () => {
    dispatch(loginUser(credentials));
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>Authentication</h2>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.username} ({user.role})!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type='text'
            name='username'
            value={credentials.username}
            onChange={handleChange}
            placeholder='Username'
          />
          <input 
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder='Password'
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
      )}
    </div>
  )
}

export default AuthStatus