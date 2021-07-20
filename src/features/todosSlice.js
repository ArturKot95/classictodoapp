import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

let fetchTodos = createAsyncThunk(
  'todos/fetch',
  async () => {
    let response = await axios.get('/todos');
    return response.data;
  }
)

let initialState = [];
let todosSlice = createSlice({
  name: 'todos',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      return payload;
    });
  }
});

export { fetchTodos };
export default todosSlice.reducer;