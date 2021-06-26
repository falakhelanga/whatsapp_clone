import axios from "axios";
import { registerActions } from "../slices/register";
import { loginActions } from "../slices/login";
import { convosActions } from "../slices/convos";

const register = (name, number, password) => async (dispatch) => {
  dispatch(registerActions.registerInit());

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/user/",
      { name, number, password },
      config
    );

    dispatch(
      registerActions.registerSucc({
        token: data?.token,
        name: data?.name,
        number: data?.number,
      })
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
      name: data.name,
      number: data.number,
      token: data.token,
      imageUrl: data.imageUrl,
    };
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    dispatch(
      registerActions.registerFail({
        error: error?.response?.data?.message,
      })
    );
  }
};

export default register;
