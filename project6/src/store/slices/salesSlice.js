import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async() => {
    const response = await axios.get('http://localhost:5000/sales');
    return response.data;
  }
);

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    list: [],
    loading: false
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.list = action.payload;
      })
  }
});

export default salesSlice.reducer;