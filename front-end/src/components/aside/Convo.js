import styled from "styled-components";
import NumMessage from "./NumMessage";
import Avatar from "@material-ui/core/Avatar";
import TextTruncate from "react-truncate-markup";
import { useHistory } from "react-router-dom";

const Status = styled.div`
  color: ${({ status }) => (status === "offline" ? "whitesmoke" : "#25D366")};
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  position: relative;
`;

const NameMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Convo = ({
  name,
  lastMessage,
  lastMessageTime,
  recipient,
  image,
  status,
  numMessage,
}) => {
  const history = useHistory();
  return (
    <Container
      className="container py-2"
      onClick={() => {
        history.push(`/${recipient}/?num=${recipient}`);
      }}
    >
      <div className="d-flex align-items-start">
        <Avatar src={image} alt={name} className="me-3">
          {name.split("")[0]}
        </Avatar>
        <NameMessage classnName="ms-4">
          <div className="fw-bold ">{name}</div>
          <TextTruncate>
            <div>{lastMessage}</div>
          </TextTruncate>
        </NameMessage>
      </div>
      <div className="d-flex flex-column align-items-end">
        <NumMessage numMessage={numMessage} />
        <Status status={status}>{status}</Status>
      </div>
    </Container>
  );
};

export default Convo;
