import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  convos: [],
};

const convosSlice = createSlice({
  name: "convos",
  initialState,
  reducers: {
    addConvoSucc: (state, action) => {
      state.convos = [...state.convos, action.payload];
      state.loading = false;
      state.error = null;
    },
    addConvoInit: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addConvoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchConvos: (state, action) => {
      action.payload.slice().sort((a, b) => {
        return (
          new Date(b.messages[b.messages.length - 1].date) -
          new Date(a.messages[a.messages.length - 1].date)
        );
      });
      state.convos = action.payload;
    },
    addMessage: (state, action) => {
      const id = action.payload.id;
      const author = action.payload.author;
      const message = action.payload.message;
      const recipientIndex = state.convos.findIndex(
        (convo) => convo.recipeientId === id
      );
      const oldMessages = state.convos.find(
        (convo) => convo.recipeientId === id
      ).messages;

      const updatedMessages = [
        ...oldMessages,
        {
          date: Date.now(),
          author: author,
          message: message,
        },
      ];
      state.convos[recipientIndex].messages = updatedMessages;
      if (author === id) {
        state.convos[recipientIndex].numMessages =
          state.convos[recipientIndex].numMessages + 1;
      }
    },

    apdateStatus: (state, action) => {
      const freindNumber = action?.payload?.freindNumber;
      const newStatus = action?.payload?.status;

      const recipientIndex = state.convos.findIndex(
        (convo) => convo.recipeientId === freindNumber
      );

      state.convos[recipientIndex].status = newStatus;
    },

    resetNumMessages: (state, action) => {
      const id = action.payload;
      const recipientIndex = state.convos.findIndex(
        (convo) => convo.recipeientId === id
      );
      if (recipientIndex) {
        state.convos[recipientIndex].numMessages = 0;
      }
    },
  },
});

export default convosSlice.reducer;
export const convosActions = convosSlice.actions;
