import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useConvoContext } from "../../context/convosContext";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #010407f8;
  border-bottom: 1px solid #d8d8d8;
  color: whitesmoke;
`;

const Header = () => {
  const { convos } = useSelector((state) => state.convoReducer);
  const location = useLocation();
  const recipient = location.search.split("=")[1];
  const currChat = convos.find((convo) => convo.recipeientId === recipient);

  return (
    <Container className="container-fluid py-1">
      <div className="d-flex align-items-center">
        <Avatar src={currChat?.recipientImage} alt={currChat?.recipientName} />
        <div className="ms-2 d-flex flex-column justify-content-start">
          <div>{currChat?.recipientName}</div>
          <div>{currChat?.status}</div>
        </div>
      </div>

      <MoreVertIcon />
    </Container>
  );
};

export default Header;
