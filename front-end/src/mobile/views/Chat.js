import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/chat/Header";
import Messages from "../components/chat/Messages";
import TypeMessage from "../components/chat/TypeMessage";
import Picker from "emoji-picker-react";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 100vh;
  flex-direction: column;
`;
const EmojiPicker = styled(Picker)`
  overflow-y: hidden;
`;
const Chat = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [value, setValue] = useState("");
  const location = useLocation();
  const recipient = location.search.split("=")[1];
  const { convos } = useSelector((state) => state.convoReducer);
  const currChat = convos.find((convo) => convo.recipeientId === recipient);
  const onEmojiClick = (event, emojiObject) => {
    setValue((currValue) => currValue + emojiObject.emoji);
  };
  return (
    <Container>
      <Header
        name={currChat?.recipientName}
        image={currChat?.recipientImage}
        status={currChat?.status}
      />
      <Messages messages={currChat?.messages} />

      <TypeMessage
        setShowEmoji={setShowEmoji}
        value={value}
        setValue={setValue}
      />
      {showEmoji && (
        <EmojiPicker
          disableSearchBar={true}
          onEmojiClick={onEmojiClick}
          className="w-100"
          pickerStyle={{
            width: "100%",
            boxShadow: "none",
            borderRadius: "0px",
          }}
        />
      )}
    </Container>
  );
};

export default Chat;
