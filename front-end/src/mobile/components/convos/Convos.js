import Convo from "./Convo";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: #03141f;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Convos = () => {
  const { convos } = useSelector((state) => state.convoReducer);
  return (
    <Container>
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

export default Convos;
