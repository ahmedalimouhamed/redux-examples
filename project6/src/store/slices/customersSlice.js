import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async() => {
    const response = await axios.get("http://localhost:5000/customers");
    return response.data;
  }
);

export const addCustomer = createAsyncThunk(
  'customers/addCustomer', async(customer) => {
    const response = await axios.post('http://localhost:5000/customers', customer);
    return response.data;
  }
);

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    loading: false
  },

  reducer: {},

  extraReducers: (builder) => {
    builder 
    .addCase(fetchCustomers.fulfilled, (state, action) => {
      state.list = action.payload
    })
    .addCase(addCustomer.fulfilled, (state, action) => {
      state.list.push(action.payload);
    })
  }
});

export default customersSlice.reducer;