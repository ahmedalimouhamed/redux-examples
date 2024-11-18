import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async() => {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'Loading...'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded'
      })
      .addCase(fetchUsers.rejected, (state) =>  {
        state.status = 'failed'
      })
  }
});

export default userSlice.reducer;