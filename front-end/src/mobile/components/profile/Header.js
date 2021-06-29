import styled from "styled-components";

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

const IcoBtn = styled(IconButton)`
  outline: none;
  color: whitesmoke;
`;
const Arrow = styled(ArrowBackIcon)`
  color: whitesmoke;
`;

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

        <h4 className="ms-4">Profile</h4>
      </div>
    </Container>
  );
};

export default Header;
