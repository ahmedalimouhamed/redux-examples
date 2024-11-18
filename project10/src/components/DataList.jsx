import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../features/dataSlice';

const DataList = () => {

  const {items, status, error} = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if(status === "idle"){
      dispatch(fetchData());
    }
  }, [dispatch, status]);

  if(status === 'loading') return <p>Loading...</p>
  if(status === 'failed') return <p>Error: {error}</p>

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

export default DataList