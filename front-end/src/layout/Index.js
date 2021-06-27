import styled from "styled-components";

import Body from "../components/aside/Body";
import Header from "../components/aside/Header";
import Search from "../components/aside/Search";
import NewChat from "../components/aside/StartNewChat";
import MainHeader from "../components/main/Header";
import useIsAuth from "../hooks_and_helpers/isAuth";
import TypeMessage from "../components/main/TypeMessage";

import {
  useFetchConvos,
  useResetNumMessages,
} from "../hooks_and_helpers/convos";
import { useSelector } from "react-redux";

import { withRouter, useLocation } from "react-router-dom";
import useRedirectHome from "../hooks_and_helpers/redirectToHome";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const Aside = styled.aside`
  background-color: rgb(3, 20, 31);
  flex: 0.3;
  display: flex;
  flex-direction: column;
  height: 90%;
  border: 1px solid #d8d8d8;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;
const Main = styled.main`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  height: 90%;
  border: 1px solid #d8d8d8;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
`;

const MessageContainer = styled.div`
  flex: 1;
  height: 100%;

  overflow-y: scroll;
  background: url("/images/chat_bg.png");
  background-size: cover;
  background-position: center;
  &::-webkit-scrollbar {
    background-color: rgb(3, 20, 31);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: whitesmoke;
  }
`;

const LayOut = ({ children }) => {
  const { number } = useSelector((state) => state.login);
  const location = useLocation();

  useFetchConvos();
  useIsAuth();
  useResetNumMessages();

  return (
    <Container className="container">
      <Aside className="">
        <Header />
        <Search />
        <NewChat />
        <Body />
      </Aside>
      <Main className="">
        {location.pathname !== "/" && (
          <MainHeader recipient={location.pathname.split("")[1]} />
        )}

        <MessageContainer className="">{children}</MessageContainer>
        {location.pathname !== "/" && <TypeMessage />}
      </Main>
    </Container>
  );
};

export default withRouter(LayOut);
