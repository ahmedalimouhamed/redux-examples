import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStatistics } from '../features/userSlice';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';

const StatisticsChart = () => {

  const dispatch = useDispatch();
  const {statistics} = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch])

  console.log(statistics);

  return (
    <div>
      <BarChart width={600} height={300} data={statistics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="count" fill="#8884d8" />
        <Bar dataKey="avgAge" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}

export default StatisticsChart