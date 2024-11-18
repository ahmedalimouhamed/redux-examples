import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchOrders = createAsyncThunk(
  'data/fetchOrders',
  async(filters) => {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:3000/orders?${queryString}`);
    return await response.json();
  }
);

export const fetchProfitsByRegion = createAsyncThunk(
  'data/fetchProfitsByRegion',
  async() => {
    const response = await fetch('http://localhost:3000/ptofits-by-region');
    return await response.json();
  }
);

export const fetchSatisfactionByRegion = createAsyncThunk(
  'data/fetchSatisfactionByRegion',
  async() => {
    const response = await fetch('http://localhost:3000/satisfaction-by-region');
    return await response.json();
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    orders: [],
    profits: [],
    satisfaction: [],
    statut: 'idle'
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchProfitsByRegion.fulfilled, (state, action) => {
        state.profits = action.payload;
      })
      .addCase(fetchSatisfactionByRegion.fulfilled, (state, action) => {
        state.satisfaction = action.payload;
      })
  }
});

export const store = configureStore({
  reducer: dataSlice.reducer
});