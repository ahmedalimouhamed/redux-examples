import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers } from '../store/slices/customersSlice';
import { fetchSales } from '../store/slices/salesSlice';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.list);
  const sales = useSelector((state) => state.sales.list);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchSales())
  }, [dispatch]);

  const salesStages = ['Lead', 'Opportunity', 'Won'];
  const salesData = salesStages.map((stage) => ({
    name: stage,
    count: sales.filter((sale) => sale.stage === stage).length
  }));

  console.log(sales);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Customer Overview</h2>
      <p>Total Customers : {customers.length}</p>
      <h2>Sales Pipeline</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip/>
          <Bar dataKey = "count" fill="#8884d8"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Dashboard