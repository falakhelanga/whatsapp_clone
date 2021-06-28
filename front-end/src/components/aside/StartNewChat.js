import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import BackDrop from "../backdrop_modal/BackDrop";
import { modalActions } from "../../store/slices/modal";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { useState } from "react";
const Btn = styled.button`
  border: none;
  outline: none;
  color: whitesmoke;
  background-color: rgb(3, 20, 31); ;
`;

const NewChat = () => {
  const dispatch = useDispatch();

  return (
    <>
      {createPortal(<BackDrop />, document.getElementById("backdrop"))}

      <Btn
        className="d-flex w-100 justify-content-center align-items-center py-3 fw-bold"
        onClick={() => {
          dispatch(modalActions.setShowModal());
        }}
      >
        Start new chat
        <AddIcon className="ms-1 fw-bolder" />
      </Btn>
    </>
  );
};

export default NewChat;
