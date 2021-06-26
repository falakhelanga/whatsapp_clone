import styled from "styled-components";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <Container
          variants={variants}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <Modal setShowModal={setShowModal} showModal={showModal} />
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Backdrop;
