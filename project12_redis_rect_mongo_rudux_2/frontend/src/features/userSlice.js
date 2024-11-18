import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "http://localhost:5000/api/users";

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async() => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const fetchStatistics = createAsyncThunk(
  'users/fetchStatistics',
  async () => {
    const response = await axios.get(`${API_URL}/statistics`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    statistics: [],
    loading: false
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  }
});

export default userSlice.reducer;