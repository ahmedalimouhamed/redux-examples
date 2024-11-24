import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAdmin = createAsyncThunk(
  'auth/login',
  async({username, password}, {rejectWithValue}) => {
    try{
      const response = await axios.post('http://localhost:5000/login', {username, password});
      console.log("token : ", response.data.token);
      return response.data.token;
    }catch(err){
      return rejectWithValue(err.reponse.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.isAuthenticated = true;
    }
  },
  extraReducers : builder =>  {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload?.message;
      })
  }  

});

export const {logout, setToken} = authSlice.actions;
export default authSlice.reducer;