import SocketProvider from "../../context/sockeHook";
import { useSelector } from "react-redux";
import useIsAuth from "../../hooks_and_helpers/isAuth";
import {
  useFetchConvos,
  useResetNumMessages,
} from "../../hooks_and_helpers/convos";

const Index = ({ children }) => {
  const { number } = useSelector((state) => state.login);

  useResetNumMessages();

  return <div>{children}</div>;
};

export default Index;
