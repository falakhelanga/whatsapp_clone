import styled from "styled-components";
import { useSelector } from "react-redux";
const Container = styled.div`
  background-color: ${({ isMe }) => (isMe ? "#25D366" : "#000b13")};
  border-radius: 5px;
  max-width: 90%;

  color: whitesmoke;
`;

const Paragraph = styled.p`
  word-break: break-all;
`;
const Message = ({ message, author, date }) => {
  const { number: myid } = useSelector((state) => state.login);
  const isMe = author === myid ? true : false;

  return (
    <div
      className={`align-self-end d-flex ${
        author === myid ? "justify-content-end " : "justify-content-start"
      } w-100 my-3`}
    >
      <Container className="p-2 " isMe={isMe}>
        <div className="d-flex justify-content-between">
          <Paragraph>{message}</Paragraph>
          <span className="d-flex align-items-end mt-1">
            {new Date(date).getHours()}:{new Date(date).getMinutes()}
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Message;
