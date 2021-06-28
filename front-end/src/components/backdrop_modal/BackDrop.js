import styled from "styled-components";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const Backdrop = ({ showModal, setShowModal }) => {
  const { show } = useSelector((state) => state.modal);
  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <Container
          variants={variants}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <Modal />
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Backdrop;
