import { convosActions } from "../slices/convos";
import axios from "axios";

export const addMessage =
  (message, author, id, setShowModal = null) =>
  async (dispatch, getState) => {
    const { number } = getState().login;
    dispatch(convosActions.addConvoInit());
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/convos/addmessage",
        {
          number,
          recipient: id,
          author,
          message,
        },
        config
      );

      dispatch(convosActions.addMessage({ id, message, author }));
      setShowModal !== null && setShowModal(false);
    } catch (error) {
      setShowModal !== null && setShowModal(false);
    }
  };

export const fetchConvos = () => async (dispatch, getState) => {
  const { number } = getState().login;

  try {
    const { data } = await axios.get(`/convos/get/${number}`);
    data.slice().sort((a, b) => {
      return (
        new Date(b.messages[b.messages.length - 1].date) -
        new Date(a.messages[a.messages.length - 1].date)
      );
    });

    dispatch(convosActions.fetchConvos(data));
  } catch (error) {
    dispatch(convosActions.addConvoFail(error?.response?.data?.message));
  }
};

const addConvo =
  (recipient, message, status, numMessages = 0) =>
  async (dispatch, getState) => {
    const { number, imageUrl } = getState().login;

    dispatch(convosActions.addConvoInit());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/convos/add",
        {
          message,
          recipient,
          number,
          imageUrl,
        },
        config
      );

      dispatch(
        convosActions.addConvoSucc({
          numMessages,
          recipientName: data?.name,
          recipeientId: recipient,
          recipientImage: data?.imageUrl,
          status: data?.status || status,
          messages: [
            {
              date: Date.now(),
              author: number,
              message: message,
            },
          ],
        })
      );

      localStorage.setItem("convos", JSON.stringify(getState().convoReducer));
    } catch (error) {
      dispatch(convosActions.addConvoFail(error?.response?.data?.message));
    }
  };

export default addConvo;
