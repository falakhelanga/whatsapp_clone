import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { useAddmessage } from "../../hooks_and_helpers/convos";
import { useSocket } from "../../context/sockeHook";
import { useRef } from "react";

const TextArea = styled.textarea`
  border-radius: 5px;
  border: none;
  outline: none;
  &:focus {
    background-color: #d8d8d8d8;
    border: #20b3b8;
    box-shadow: 0px 0px 10px #20b3b8;
  }
`;
const Input = styled.input`
  border-radius: 5px;
  border: none;
  outline: none;
  &:focus {
    background-color: #d8d8d8d8;
    border: #20b3b8;
    box-shadow: 0px 0px 10px #20b3b8;
  }
`;

const InnerContainer = styled.div`
  background-color: #03141f;
  border-radius: 10px;
`;

const Button = styled.button``;
const variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
};
const Modal = ({ setShowModal, showModal }) => {
  const { addMessageHandler } = useAddmessage();
  const socket = useSocket();
  const numberRef = useRef();
  const messageRef = useRef();

  const { number: myNumber } = useSelector((state) => state.login);
  const { error } = useSelector((state) => state.convoReducer);
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          animate="visible"
          initial="hidden"
          exit="hidden"
          variants={variants}
          className="row  w-100 d-flex justify-content-center align-items-center container"
        >
          <InnerContainer className="col-sm-12 col-lg-6 col-md-8  ">
            {error && error === "this number does not exist" && (
              <Paper className="bg-danger p-3 text-white mt-4">{error}</Paper>
            )}
            <form
              className="d-flex flex-column p-3"
              onSubmit={(e) => {
                e.preventDefault();

                const number = numberRef?.current?.value;
                const message = messageRef?.current?.value;
                if (number === myNumber) return;
                socket.emit("send-message", {
                  author: myNumber,
                  message,
                  recipient: number,
                  status: "online",
                });
                addMessageHandler(message, myNumber, number, setShowModal);
              }}
            >
              <div className="d-flex flex-column mt-3">
                <label htmlFor="number" className="fw-bold text-white">
                  number
                </label>
                <Input
                  ref={numberRef}
                  type="text"
                  placeholder="your freind number"
                  className="py-2 ps-2"
                />
              </div>
              <div className="d-flex flex-column mt-3">
                <label htmlFor="number" className="fw-bold text-white">
                  message
                </label>
                <TextArea
                  ref={messageRef}
                  rows="3"
                  placeholder="your message"
                  className="py-2 ps-2"
                />
              </div>
              <div className="d-flex">
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="mt-3 btn w-100 bg-light fw-bold me-1 "
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="mt-3 btn w-100 text-white fw-bold bg-dark"
                >
                  Send
                </Button>
              </div>
            </form>
          </InnerContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
