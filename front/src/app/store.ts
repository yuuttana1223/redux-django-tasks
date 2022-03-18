import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import taskReducer from "features/task/TaskSlice";

export const store = configureStore({
  reducer: {
    login: authReducer,
    task: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
