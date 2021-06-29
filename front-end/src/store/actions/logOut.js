import { convosActions } from "../slices/convos";
import { loginActions } from "../slices/login";

const logOut = () => (dispatch) => {
  dispatch(convosActions.logOutConvo());
  dispatch(loginActions.logOut());
  const user = JSON.stringify({
    name: null,
    number: null,
    token: null,
  });

  const convos = JSON.stringify({ loading: false, error: null, convos: [] });
  localStorage.setItem("user", user);
  localStorage.setItem("convos", convos);
};

export default logOut;
