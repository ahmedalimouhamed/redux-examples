import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '../store/slices/authSlice';

const Auth = () => {

  const [credentials, setCredentials] = useState({username: '', password: ''});
  const dispatch = useDispatch();
  const {isAuthenticated, user, error} = useSelector((state) => state.auth);

  const handleChange = e => setCredentials({...credentials, [e.target.name]: e.target.value});
  const handleLogin = () => dispatch(loginUser(credentials));
  const handleLogout = () => dispatch(logout());
 
  return (
    <div>
      {
        isAuthenticated ? (
          <div>
            <p>Welcome, {user.username} ({user.role})!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <input 
              type="text" 
              name="username"
              placeholder='Username'
              onChange={handleChange}
            />
            <input 
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange} 
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
          </div>
        )
      }
    </div>
  )
}

export default Auth