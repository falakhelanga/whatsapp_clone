import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import TextTruncate from "react-truncate-markup";
import NumMessage from "../../../components/aside/NumMessage";
import { useHistory } from "react-router-dom";
const Container = styled.div`
  display: flex;
  align-items: center;
  color: whitesmoke;
  background-color: #03141f;
  justify-content: space-between;
`;
const NameMessage = styled.div`
  border-bottom: 1px solid #d8d8d8;
`;
const Status = styled.div`
  color: ${({ status }) => (status === "offline" ? "whitesmoke" : "#25D366")};
`;
const Convo = ({
  numMessage,
  status,
  recipient,
  name,
  lastMessage,
  image,
  lastMessageTime,
}) => {
  const history = useHistory();
  return (
    <Container
      className="container py-2"
      onClick={() => {
        history.push(`/messages/?freind=${recipient}`);
      }}
    >
      <Avatar src={image} alt="recipient Image" />
      <NameMessage className="d-flex align-items-start justify-content-between py-3 w-100">
        <div className=" ms-3 d-flex flex-column justify-content-center">
          <div className="fw-bold text-capitalize">{name}</div>
          <TextTruncate>
            <div>{lastMessage}</div>
          </TextTruncate>
        </div>

        <div className="d-flex flex-column align-items-end">
          <Status status={status}>{status}</Status>
          <div className="mt-2">
            <NumMessage numMessage={numMessage} />
          </div>
        </div>
      </NameMessage>
    </Container>
  );
};

export default Convo;
