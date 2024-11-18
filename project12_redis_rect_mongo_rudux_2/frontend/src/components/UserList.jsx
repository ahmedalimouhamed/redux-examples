import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { fetchUsers } from '../features/userSlice';

const UserList = () => {

  const dispatch = useDispatch();
  const {list, loading} = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch]);

  if(loading) return <p>Loading ....</p>;

  return (
    <ul>
      {list.map((user) => (
        <li key={user._id}>{user.name} - {user.role}</li>
      ))}
    </ul>
  )
}

export default UserList