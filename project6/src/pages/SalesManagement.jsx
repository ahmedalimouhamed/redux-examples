import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSales } from '../store/slices/salesSlice';

const SalesManagement = () => {

  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales.list);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  const filteredSales = filter === 'All' ?sales : sales.filter((sale) => sale.stage === filter);

  return (
    <div>
      <h1>Sales Management</h1>
      <div>
        <label>Filter by Stage : </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Lead">Lead</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Won">Won</option>
        </select>
      </div>
      <ul>
        {filteredSales.map(sale => (
          <li key={sale.id}>
            <strong>{sale.stage}</strong> : ${sale.amount} (Assigned to User ID : {sale.repId})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalesManagement