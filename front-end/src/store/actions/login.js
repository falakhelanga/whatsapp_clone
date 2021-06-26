import axios from "axios";
import { loginActions } from "../slices/login";
import { convosActions } from "../slices/convos";
const login = (number, password) => async (dispatch) => {
  dispatch(loginActions.loginInit());

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/user/login",
      { number, password },
      config
    );

    dispatch(
      loginActions.loginSucc({
        token: data?.token,
        name: data?.name,
        number: data?.number,
        imageUrl: data.imageUrl,
      })
    );
    dispatch(convosActions.fetchConvos(data?.convos));
    const user = {
      name: data?.name,
      number: data?.number,
      token: data?.token,
      imageUrl: data?.imageUrl,
    };
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    dispatch(
      loginActions.loginFail({
        error: error?.response?.data?.message,
      })
    );
  }
};

export const updateImageUrl = (imageUrl) => (dispatch) => {
  const oldUser = JSON.parse(localStorage.getItem("user"));
  const updatedUser = { ...oldUser, imageUrl };

  dispatch(loginActions.imageUpload({ imageUrl }));
  localStorage.setItem("user", JSON.stringify(updatedUser));
};
export default login;
