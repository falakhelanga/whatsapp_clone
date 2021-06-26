import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  token: null,
  name: null,
  number: null,
};

const register = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerInit: (state, action) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.number = null;
      state.name = null;
    },
    registerSucc: (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.number = action.payload.number;
      state.name = action.payload.name;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.token = null;
      state.number = null;
      state.name = null;
    },
  },
});

export default register.reducer;

export const registerActions = register.actions;
