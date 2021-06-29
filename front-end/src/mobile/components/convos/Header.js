import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import logOut from "../../../store/actions/logOut";
import { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    handleClose();
  };
  return (
    <Container className="container py-4">
      <Avatar src={imageUrl} alt="profile picture" />
      <Logo>Whatsapp Clone</Logo>
      <div>
        <MoreVertIcon onClick={handleClick} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </Container>
  );
};

export default Header;
