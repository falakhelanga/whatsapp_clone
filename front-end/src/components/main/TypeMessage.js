import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { useSocket } from "../../context/sockeHook";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useAddmessage } from "../../hooks_and_helpers/convos";

const Container = styled.div`
  background-color: rgb(3, 20, 31);
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #d8d8d8;
  align-items: center;
  color: whitesmoke;
`;

const Input = styled.textarea`
  background-color: rgb(3, 20, 31);
  border: none;
  outline: none;
  color: whitesmoke;
  flex: 1;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Send = styled(SendIcon)`
  transform: rotate(-45deg);
  color: whitesmoke;
`;

const IcoBtn = styled(IconButton)`
  outline: none;
`;
const TypeMessage = () => {
  const { addMessageHandler } = useAddmessage();
  const location = useLocation();
  const { number } = useSelector((state) => state.login);
  const socket = useSocket();
  const recipient = location.search.split("=")[1];
  const [value, setValue] = useState("");

  useEffect(() => {
    if (socket !== null) {
      if (value !== "") {
        socket.emit("typing", { number, recipient });
      } else {
        socket.emit("not-typing", { number, recipient });
      }

      return () => {
        socket.off("typing");
        socket.off("not-typing");
      };
    }
  }, [value, socket, recipient, number]);

  return (
    <Container className="container py-2">
      <Input
        type="text"
        value={value}
        placeholder="type message..."
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <IcoBtn
        onClick={() => {
          socket.emit("send-message", {
            author: number,
            message: value,
            recipient,
            status: "online",
          });
          addMessageHandler(value, number, recipient, null);
          setValue("");
        }}
      >
        <Send />
      </IcoBtn>
    </Container>
  );
};
export default memo(TypeMessage);
