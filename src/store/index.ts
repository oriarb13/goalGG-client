import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
