import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice';
import toastReducer from '../features/toastSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    globalMessages: toastReducer
  }
});
