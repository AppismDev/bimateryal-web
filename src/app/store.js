import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../pages/SignInPage/signInSlice";

export const store = configureStore({
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({
  //   serializableCheck: {
  //     // Ignore these action types
  //     ignoredActions: ['your/action/'],
  //     // Ignore these field paths in all actions
  //     ignoredActionPaths: ['payload'],
  //     // Ignore these paths in the state
  //     ignoredPaths: ['payload'],
  //   },
  // }),
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});
