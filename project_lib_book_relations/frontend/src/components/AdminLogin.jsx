import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from '../features/authSlice';

const AdminLogin = () => {

  const dispatch = useDispatch();
  const {isAuthenticated, error} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({username: '', password: ''});

  const handleChange = e => {
    setFormData({...formData, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await dispatch(loginAdmin(formData)).unwrap();
    localStorage.setItem('token', token);
  }
 
  return (
    <div>
      <h2>Admin Login</h2>
      {error && <p style={{ color:'red' }}>{error}</p>}
      {isAuthenticated ? (
        <p>Welcome, Admin</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input 
            type="password" 
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  )
}

export default AdminLogin