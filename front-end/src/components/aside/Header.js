import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import ChatIcon from "@material-ui/icons/Chat";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #010407f8;
  border-bottom: 1px solid #d8d8d8;
  color: whitesmoke;
`;

const ChatMore = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const Header = () => {
  const { imageUrl } = useSelector((state) => state.login);
  return (
    <Container className="container-fluid py-2">
      <Avatar src={imageUrl} alt="default image" />

      <ChatMore className="">
        <ChatIcon className="me-4" />
        <MoreVertIcon />
      </ChatMore>
    </Container>
  );
};
export default Header;
