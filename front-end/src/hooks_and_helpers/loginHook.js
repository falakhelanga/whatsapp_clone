import { useDispatch, useSelector } from "react-redux";
import login from "../store/actions/login";

const useLogin = () => {
  const dispatch = useDispatch();

  const { loading, name, number, error, token } = useSelector(
    (state) => state.login
  );

  const loginHandler = (number, password) => {
    dispatch(login(number, password));
  };

  return {
    loginHandler,
    name,
    number,
    error,
    loading,
    token,
  };
};

export default useLogin;
