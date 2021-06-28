import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  background-color: #010407f8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: whitesmoke;
`;
const Logo = styled.h3`
  color: whitesmoke;
`;

const Header = () => {
  const { imageUrl } = useSelector((state) => state.login);

  return (
    <Container className="container py-4">
      <Avatar src={imageUrl} alt="profile picture" />
      <Logo>Whatsapp Clone</Logo>
      <MoreVertIcon />
    </Container>
  );
};

export default Header;
