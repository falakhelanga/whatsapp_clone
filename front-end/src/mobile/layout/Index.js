import SocketProvider from "../../context/sockeHook";
import { useSelector } from "react-redux";

const Index = ({ children }) => {
  const { number } = useSelector((state) => state.login);

  return <div>{children}</div>;
};

export default Index;
