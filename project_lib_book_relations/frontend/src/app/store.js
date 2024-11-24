import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "../features/bookSlice";
import { authorSlice } from "../features/authorSlice";
import { publisherSlice } from "../features/publisherSlice";
import { readerSlice } from "../features/readerSlice";
import { authSlice } from "../features/authSlice";


export const store = configureStore({
  reducer: {
    [bookSlice.reducerPath]: bookSlice.reducer,
    [authorSlice.reducerPath]: authorSlice.reducer,
    [publisherSlice.reducerPath]: publisherSlice.reducer,
    [readerSlice.reducerPath]: readerSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(bookSlice.middleware)
      .concat(authorSlice.middleware)
      .concat(publisherSlice.middleware)
      .concat(readerSlice.middleware)
});