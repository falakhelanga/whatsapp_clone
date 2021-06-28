import io from "socket.io-client";
import { createContext, useContext, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import addConvoAction from "../store/actions/convos";
import { convosActions } from "../store/slices/convos";

export const socketContext = createContext();

export const useSocket = () => {
  return useContext(socketContext);
};

const SocketProvider = ({ children, number }) => {
  const [newSocket, setSocket] = useState(null);

  const { convos } = useSelector((state) => state.convoReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const socket = io("https://chatappclone.herokuapp.com", {
      query: { id: number },
    });

    setSocket(socket);
    return () => {
      socket.close();
    };
  }, [number]);
  useEffect(() => {
    const myRecipients = convos.map((convo) => convo.recipeientId);
    if (newSocket !== null) {
      newSocket.on("disconnect", () => {
        newSocket.emit("I-am-disconected", { myRecipients, number });
      });
      newSocket.on("owk-let-connect", ({ freindNumber }) => {
        const freind = convos.find(
          (convo) => convo.recipeientId === freindNumber
        );
        if (!freind) return;
        dispatch(
          convosActions.apdateStatus({ freindNumber, status: "online" })
        );
      });
      newSocket.on("connect", () => {
        newSocket.emit("I-am-connected", { myRecipients, number });
        console.log("i am conected");
      });
      newSocket.on("your-freind-is-online", ({ freindNumber, status }) => {
        newSocket.emit("i-am-also-online", { number, freindNumber });
        const freind = convos.find(
          (convo) => convo.recipeientId === freindNumber
        );
        if (!freind) return;
        dispatch(convosActions.apdateStatus({ freindNumber, status }));
      });

      newSocket.on("your-freind-is-disconected", ({ freindNumber, status }) => {
        const freind = convos.find(
          (convo) => convo.recipeientId === freindNumber
        );
        if (!freind) return;
        dispatch(convosActions.apdateStatus({ freindNumber, status }));
      });
      newSocket.on(
        "recieve-message",
        ({ author, message, recipient, status }) => {
          const path = location.search.split("=")[1];
          const convoExist = convos.find(
            (convo) => convo.recipeientId === recipient
          );
          if (convoExist) {
            dispatch(
              convosActions.addMessage({ id: recipient, author, message, path })
            );
          } else {
            dispatch(addConvoAction(recipient, message, status, 1));
          }
        }
      );
      newSocket.on("your-friend-is-typing", ({ freindNumber }) => {
        const freind = convos.find(
          (convo) => convo.recipeientId === freindNumber
        );
        if (!freind) return;
        dispatch(
          convosActions.apdateStatus({ freindNumber, status: "typing..." })
        );
      });

      newSocket?.on("your-friend-is-done-typing", ({ freindNumber }) => {
        const freind = convos.find(
          (convo) => convo.recipeientId === freindNumber
        );
        if (!freind) return;
        dispatch(
          convosActions.apdateStatus({ freindNumber, status: "online" })
        );
      });
    }
    return () => {
      if (newSocket !== null) {
        newSocket.off("connect");
        newSocket.off("your-friend-is-done-typing");
        newSocket.off("your-friend-is-typing");
        newSocket.off("I-am-connected");
        newSocket.off("your-freind-is-online");
        newSocket.off("recieve-message");
      }
    };
  }, [number, dispatch, convos, newSocket, location]);

  return (
    <socketContext.Provider value={newSocket}>
      {children}
    </socketContext.Provider>
  );
};

export default memo(SocketProvider);
