import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, (state) =>    {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default dataSlice.reducer;