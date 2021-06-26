import styled from "styled-components";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRef, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Body = () => {
  const { id: recipient } = useParams();
  const { convos } = useSelector((state) => state.convoReducer);
  const currChat = convos.find((convo) => convo.recipeientId === recipient);
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ smooth: true });
    }
    // eslint-disable-next-line
  }, [messageRef.current]);

  return (
    <Container className="container py-2">
      {currChat?.messages?.map((message, index) => {
        const lastMessage = currChat.messages.length - 1 === index;

        return (
          <div
            className=" w-100"
            ref={lastMessage ? messageRef : null}
            key={message._id}
          >
            <Message
              message={message.message}
              author={message.author}
              date={message.date}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default Body;
