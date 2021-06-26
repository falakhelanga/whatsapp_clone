import styled from "styled-components";
import Message from "./Message";
import { useRef, useEffect } from "react";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  background: url("/images/bg-2.png");
`;

const Messages = ({ messages }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ smooth: true });
    }
    // eslint-disable-next-line
  }, [messageRef.current]);
  return (
    <Container className="container">
      {messages.map((message, index) => {
        const lastMessage = messages?.length - 1 === index;
        return (
          <div key={message._id} ref={lastMessage ? messageRef : null}>
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

export default Messages;
