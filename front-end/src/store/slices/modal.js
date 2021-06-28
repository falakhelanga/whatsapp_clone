import { createSlice } from "@reduxjs/toolkit";

const showModal = createSlice({
  name: "showModal",
  initialState: { show: false },
  reducers: {
    setShowModal: (state, action) => {
      state.show = true;
    },
    hideModal: (state, action) => {
      state.show = false;
    },
  },
});

export default showModal.reducer;

export const modalActions = showModal.actions;
