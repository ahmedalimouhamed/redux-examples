import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  const {user} = useSelector((state) => state.auth);

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      {user?.role === 'admin' && <Link to="/customers">Customer Management</Link>}
      <Link to="/sales">Management</Link>
    </nav>
  )
}

export default Navbar