import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

let fetchTodos = createAsyncThunk(
  'todos/fetch',
  async () => {
    let response = await axios.get('/todos');
    return response.data;
  }
)

let updateTodo = createAsyncThunk(
  'todos/update',
  async ({_id, ...data}) => {
    let response = await axios.patch('/todos', {_id, ...data});
    return response.data;
  }
);

let newTodo = createAsyncThunk(
  'todos/new',
  async (todo) => {
    let response = await axios.post('/todos', todo);
    return response.data;
  }
);

let initialState = [];
let todosSlice = createSlice({
  name: 'todos',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      return payload;
    });

    builder.addCase(updateTodo.fulfilled, (state, { payload }) => {
      let stateCopy = [];
      for (let i in state) {
        if (state[i]._id === payload._id) {
          stateCopy.push({...state[i],...payload});
        }
        else stateCopy.push(state[i]);
      }
      return stateCopy;
    });

    builder.addCase(newTodo.fulfilled, (state, { payload }) => {
      state.push(payload);
    })
  }
});

export { fetchTodos, updateTodo, newTodo };
export default todosSlice.reducer;