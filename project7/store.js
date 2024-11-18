import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: 'idle',
  error: null
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const mockData = [
      {label: 'North', value:120},
      {label: 'South', value:95},
      {label: 'East', value:75},
      {label: 'Wast', value:85},
    ]
    
    return new Promise((resolve) => setTimeout(() => resolve(mockData)));
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; 
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});

