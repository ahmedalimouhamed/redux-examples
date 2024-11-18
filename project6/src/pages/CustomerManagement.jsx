import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, fetchCustomers } from '../store/slices/customersSlice';

const CustomerManagement = () => {

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.list);
  const [newCustomer, setNewCustomer] = useState({name: '', status: 'Potential'});

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch]);

  const handleChange = e => {
    const {name, value} = e.target;
    setNewCustomer((prev) => ({...prev, [name]: value}));
  };

  const handleAddCustomer = () => {
    if(newCustomer.name){
      dispatch(addCustomer(newCustomer));
      setNewCustomer({name: '', status: 'Potential'});
    }
  };

  return (
    <div>
      <h1>Customer Management</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <strong>{customer.name} - {customer.status}</strong>
          </li>
        ))}
      </ul>
      <h2>Add New Customer</h2>
      <input 
        type="text" 
        name="name"
        value={newCustomer.name}
        onChange={handleChange}
        placeholder='Customer Name'
      />
      <select 
        name="status"
        value={newCustomer.status}
        onChange={handleChange}
      >
        <option value="Potential">Potential</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button onClick={handleAddCustomer}>Add Customer</button>
    </div>
  )
}

export default CustomerManagement