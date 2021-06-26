import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #010407f8;
  color: whitesmoke;
`;
const Status = styled.div`
  color: ${({ status }) => (status === "offline" ? "whitesmoke" : "#25D366")};
`;
const IcoBtn = styled(IconButton)`
  outline: none;
  color: whitesmoke;
`;
const Arrow = styled(ArrowBackIcon)`
  color: whitesmoke;
`;
const Name = styled.span``;
const Header = ({ name, image, status }) => {
  const history = useHistory();
  return (
    <Container className="py-3 container">
      <div className="d-flex align-items-center">
        <IcoBtn
          onClick={() => {
            history.goBack();
          }}
        >
          <Arrow className="" />
        </IcoBtn>

        <Avatar src={image} alt="reipient image" />
        <div className="d-flex flex-column ms-3">
          <Name className="fw-bold text-capitalize">{name}</Name>
          <Status status={status}>{status}</Status>
        </div>
      </div>

      <MoreVertIcon />
    </Container>
  );
};

export default Header;
