import { configureStore } from "@reduxjs/toolkit";
import login from "./slices/login";
import register from "./slices/register";
import convoReducer from "./slices/convos";
import modal from "./slices/modal";
import dialog from "./slices/dialog";

const initialConvos =
  localStorage.getItem("convos") !== null
    ? JSON.parse(localStorage.getItem("convos"))
    : {
        loading: false,
        error: null,
        convos: [],
      };
const initialUser =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : {
        name: null,
        number: null,
        token: null,
      };
const store = configureStore({
  reducer: {
    convoReducer,
    login,
    register,
    modal,
    dialog,
  },

  preloadedState: {
    login: initialUser,
  },
});

export default store;
