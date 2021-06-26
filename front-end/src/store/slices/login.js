import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  token: null,
  name: null,
  number: null,
  imageUrl: null,
};

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginInit: (state, action) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.number = null;
      state.name = null;
      state.imageUrl = null;
    },
    loginSucc: (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.number = action.payload.number;
      state.name = action.payload.name;
      state.imageUrl = action.payload.imageUrl;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.token = null;
      state.number = null;
      state.name = null;
      state.imageUrl = null;
    },
    imageUpload: (state, action) => {
      state.imageUrl = action.payload.imageUrl;
    },
  },
});

export default login.reducer;

export const loginActions = login.actions;
