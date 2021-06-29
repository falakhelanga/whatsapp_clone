import { fetchConvos } from "../store/actions/convos";
import addConvoAction, { addMessage } from "../store/actions/convos";
import { useEffect, useCallback } from "react";
import { convosActions } from "../store/slices/convos";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../context/sockeHook";
import { useLocation } from "react-router-dom";

export const useFetchConvos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConvos());
  }, [dispatch]);
};

export const useAddmessage = () => {
  const { convos } = useSelector((state) => state.convoReducer);
  const dispatch = useDispatch();

  const addMessageHandler = useCallback(
    (message, author, id) => {
      const convoExist = convos.find((convo) => convo.recipeientId === id);

      if (convoExist) {
        dispatch(addMessage(message, author, id));
      } else {
        dispatch(addConvoAction(id, message, "online", author));
      }
    },
    [convos, dispatch]
  );

  return { addMessageHandler };
};

export const useRecieveMessage = () => {
  const socket = useSocket();
  const { addMessageHandler } = useAddmessage();
  const location = useLocation();

  useEffect(() => {
    if (socket == null) return;
    socket.on("recieve-message", ({ author, message, recipient }) => {
      console.log(message);
      console.log("kk");
      addMessageHandler(message, author, recipient);
    });

    return () => socket.off("recieve-message");
  }, [socket, addMessageHandler, location]);
};

export const useResetNumMessages = () => {
  const location = useLocation();
  const number = location.search.split("=")[1];
  const dispatch = useDispatch();
  useEffect(() => {
    if (number) {
      dispatch(convosActions.resetNumMessages(number));
    }
  }, [dispatch, number]);
};
