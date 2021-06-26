import { useDispatch, useSelector } from "react-redux";
import register from "../store/actions/register";

const useRegister = () => {
  const dispatch = useDispatch();

  const { loading, name, number, error, token } = useSelector(
    (state) => state.register
  );

  const registerHandler = (name, number, password) => {
    dispatch(register(name, number, password));
  };

  return {
    registerHandler,
    name,
    number,
    error,
    loading,
    token,
  };
};

export default useRegister;
