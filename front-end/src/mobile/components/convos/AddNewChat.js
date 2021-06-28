import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import BackDrop from "../../../components/backdrop_modal/BackDrop";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { modalActions } from "../../../store/slices/modal";
const Container = styled.div`
  background-color: teal;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  position: fixed;
  bottom: 30px;
  right: 20px;
`;

const AddNewChat = () => {
  const dispatch = useDispatch();
  return (
    <>
      {createPortal(<BackDrop />, document.getElementById("backdrop"))}
      <Container className="fw-bold">
        <IconButton
          onClick={() => {
            dispatch(modalActions.setShowModal());
          }}
        >
          <AddIcon />
        </IconButton>
      </Container>
    </>
  );
};

export default AddNewChat;
