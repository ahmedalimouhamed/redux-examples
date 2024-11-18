import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../features/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const {list, status} = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]);

  if(status === 'loading') return <p>Loading ...</p>;
  if(status === 'failed') return <p>Error loading users</p>;

  return (
    <div>
      <ul>
        {list.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList