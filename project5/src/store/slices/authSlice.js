import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserApi } from "../../api";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async(credentials, {rejectWithValue}) => {
    const user = await fetchUserApi(credentials);
    if(!user) return rejectWithValue('Invalid credentials');
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null
  },

  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null
    }
  },

  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;