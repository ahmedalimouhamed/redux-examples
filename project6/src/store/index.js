import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customersReducer from './slices/customersSlice';
import salesReducer from './slices/salesSlice';

const store = configureStore({
  reducer:{
    auth: authReducer,
    customers: customersReducer,
    sales: salesReducer
  }
});

export default store;