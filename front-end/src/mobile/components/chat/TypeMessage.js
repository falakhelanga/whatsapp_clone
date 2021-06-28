import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { useSocket } from "../../../context/sockeHook";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useAddmessage } from "../../../hooks_and_helpers/convos";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

const Container = styled.div`
  background-color: #e5ddd5;
  display: flex;
  justify-content: space-between;
  width: 100%;

  align-items: center;
  color: whitesmoke;
`;

const Input = styled.textarea`
  background-color: transparent;
  border: none;
  outline: none;
  color: whitesmoke;
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Send = styled(SendIcon)`
  color: whitesmoke;
`;

const IcoBtn = styled(IconButton)`
  outline: none;
`;
const InputArea = styled.div`
  display: flex;
  border-radius: 50px;
  flex: 1;
  background-color: #03141f;
  align-items: center;

  border: 1px solid #d8d8d8;
`;
const Emoji = styled(EmojiEmotionsIcon)`
  color: whitesmoke;
`;
const TypeMessage = ({ setShowEmoji, value, setValue }) => {
  const { addMessageHandler } = useAddmessage();
  const location = useLocation();
  const { number } = useSelector((state) => state.login);
  const socket = useSocket();
  const recipient = location.search.split("=")[1];

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
      <InputArea className="  px-3">
        <IcoBtn
          onClick={() => {
            setShowEmoji((prevState) => !prevState);
          }}
        >
          <Emoji />
        </IcoBtn>
        <Input
          type="text"
          value={value}
          placeholder="type message..."
          onFocus={() => {
            setShowEmoji(false);
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </InputArea>
      <IcoBtn
        className="p-3"
        onClick={() => {
          socket.emit("send-message", {
            author: number,
            message: value,
            recipient,
            status: "online",
          });
          setShowEmoji(false);
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
