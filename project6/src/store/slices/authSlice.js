import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async(credentials, {rejectWithValue}) => {
    try{
      const response = await axios.get("http://localhost:5000/users", {
        params: credentials
      });

      const user = response.data[0];
      if(!user) return rejectWithValue('Invalid username or password');
      return user;
    }catch(error){
      return rejectWithValue(error.message);
    }
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
    logout: (state) =>  {
      state.isAuthenticated = false;
      state.user = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;