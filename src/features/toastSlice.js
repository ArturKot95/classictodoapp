import { createSlice, nanoid } from "@reduxjs/toolkit";

let initialState = [];
let toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addGlobalMessage(state, { payload }) {
      state.push({id: nanoid(), text: payload});
    },
    removeGlobalMessageById(state, { payload }) {
      return [...state.filter(toast => toast.id !== payload)];
    }
  }
});

export const { addGlobalMessage, removeGlobalMessageById } = toastSlice.actions;
export default toastSlice.reducer;