import Convo from "./Convo";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useGetConvos } from "../../context/convosContext";
import { useEffect } from "react";
import arraySort from "array-sort";

const Container = styled.div`
  overflow-y: scroll;
  background-color: rgb(3, 20, 31);
  color: whitesmoke;
  &::-webkit-scrollbar {
    background-color: rgb(3, 20, 31);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: whitesmoke;
  }
`;
const H4 = styled.h4`
  color: whitesmoke;
`;
const Body = () => {
  const { convos } = useSelector((state) => state.convoReducer);

  return (
    <Container>
      {convos.length === 0 && (
        <div className="d-flex align-items-center flex-column h-100 w-100 justify-content-center mt-4">
          <H4>You have no chats!</H4>
        </div>
      )}
      {convos &&
        convos
          .slice()
          .sort((a, b) => {
            return (
              new Date(b.messages[b.messages.length - 1].date) -
              new Date(a.messages[a.messages.length - 1].date)
            );
          })
          .map((convo) => (
            <Convo
              numMessage={convo.numMessages}
              status={convo.status}
              key={convo._id}
              recipient={convo.recipeientId}
              name={convo.recipientName}
              lastMessage={
                convo.messages.length > 0
                  ? convo.messages[convo.messages.length - 1].message
                  : ""
              }
              image={convo.recipientImage}
              lastMessageTime={
                convo.messages.length > 0
                  ? convo.messages[convo.messages.length - 1].date
                  : ""
              }
            />
          ))}
    </Container>
  );
};

export default Body;
