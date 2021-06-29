import { createSlice } from "@reduxjs/toolkit";

const dialog = createSlice({
  name: "dialog",
  initialState: {
    open: false,
  },
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
    },
    closeDialog: (state, action) => {
      state.open = false;
    },
  },
});

export default dialog.reducer;

export const dialogActions = dialog.actions;
