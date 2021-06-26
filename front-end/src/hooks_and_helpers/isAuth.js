import { useEffect } from "react";
import { useUserData } from "../hooks_and_helpers/register";
import { useHistory } from "react-router-dom";
import useLogin from "../hooks_and_helpers/loginHook";

const useIsAuth = () => {
  const { token } = useLogin();

  const history = useHistory();
  const isAuth = token;

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [isAuth, history]);
};

export default useIsAuth;
