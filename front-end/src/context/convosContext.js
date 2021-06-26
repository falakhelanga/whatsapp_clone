import { useContext, useState, useEffect, createContext } from "react";
import convos from "../data/convos";
import data from "../data/convos";

const ConvoContext = createContext();

export const useConvoContext = () => {
  const { convos, setConvos } = useContext(ConvoContext);

  return { convos, setConvos };
};

// hook for adding conversation
export const useAddConvo = () => {
  const { setConvos } = useConvoContext();

  const addConvo = (name, number, message) => {
    setConvos((oldConvos) => [
      ...oldConvos,
      {
        recipientName: name,
        recipeientId: number,
        recipientImage: "/images/angel.jpg",

        messages: [
          {
            date: Date.now(),
            author: number,
            message: message,
          },
        ],
      },
    ]);

    const localItems =
      localStorage.getItem("convos") !== null
        ? JSON.stringify([
            ...JSON.parse(localStorage.getItem("convos")),
            {
              recipientName: name,
              recipeientId: number,
              recipientImage: "",

              messages: [
                {
                  date: Date.now(),
                  author: number,
                  message: message,
                },
              ],
            },
          ])
        : JSON.stringify([
            {
              recipientName: name,
              recipeientId: number,
              recipientImage: "",

              messages: [
                {
                  date: Date.now(),
                  author: number,
                  message: message,
                },
              ],
            },
          ]);
    localStorage.setItem("convos", localItems);
  };

  return { addConvo };
};

// hook for fetching conversation on first render
export const useGetConvos = () => {
  const { setConvos } = useConvoContext();

  useEffect(() => {
    const localConvos =
      localStorage.getItem("convos") !== null
        ? JSON.parse(localStorage.getItem("convos"))
        : [];
    setConvos(localConvos);
  }, [setConvos]);
};

// convo Context provider
export const ConvoContextProvider = ({ children }) => {
  const [convos, setConvos] = useState([]);
  return (
    <ConvoContext.Provider value={{ convos, setConvos }}>
      {children}
    </ConvoContext.Provider>
  );
};
