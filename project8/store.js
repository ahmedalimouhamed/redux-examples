import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async() => {
    const response = await fetch('http://localhost:3000/data');
    const data = await response.json();
    return data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      });
  }
});

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
})