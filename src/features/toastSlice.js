import { createSlice } from "@reduxjs/toolkit";

let initialState = { message: '' };
let toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    displayMessage(state, { payload }) {
      state.message = payload;
    }
  }
});

export const { displayMessage } = toastSlice.actions;
export default toastSlice.reducer;