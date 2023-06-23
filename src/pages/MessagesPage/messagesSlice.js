import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot, query } from "firebase/firestore";
import { getInbox, listenUserInbox, sendMessage } from "./messagesAPI";

const initialState = {
  messages: [],
  loading: false,
  inbox: [],
  selectedUser: null,
  // TEXT FIELD
  messageText: "",
  selectedInbox: null,
};

// export const fetchMessagesAsync = createAsyncThunk(
//     'messages/fetchMessagesAsync',
//     async (userId) => {
//         const response = await fetchMessages(userId)
//         return response
//     }
// )
export const fetchInboxAsync = createAsyncThunk(
  "messages/fetchInboxAsync",
  async (userId) => {
    const response = await getInbox(userId);
    return response;
  }
);

export const sendMessageAsync = createAsyncThunk(
  "messages/sendMessageAsync",
  async (message) => {
    console.log("message is sent", message);
    const response = await sendMessage(message);
    console.log(
      "message is sent ",
      response ? "successfully" : "unsuccessfully"
    );
    return response;
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessageText: (state, action) => {
      state.messageText = action.payload;
    },
    setSelectedInbox: (state, action) => {
      state.selectedInbox = action.payload;
    },

    addInbox: (state, action) => {
      state.inbox = action.payload;
    },
    // listenUserInboxAction: (state, action) => {
    //     listenUserInbox(action.payload, (inbox) => {
    //         console.log("inbox is changed", inbox)
    //         state.inbox.push(inbox)
    //     })
    // }
  },
  extraReducers: {
    [sendMessageAsync.pending]: (state, action) => {},

    [sendMessageAsync.fulfilled]: (state, action) => {
      // state.messages.push(action.payload)
    },
    [sendMessageAsync.rejected]: (state, action) => {},
    [fetchInboxAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchInboxAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.inbox = action.payload;
    },
    [fetchInboxAsync.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  addMessage,
  setSelectedUser,
  setMessageText,
  setSelectedInbox,
  addInbox,
} = messagesSlice.actions;

export const selectMessages = (state) => state.messages.messages;
export const selectSelectedInbox = (state) => state.messages.selectedInbox;
export const selectLoading = (state) => state.messages.loading;
export const selectInbox = (state) => state.messages.inbox;
export const selectSelectedUser = (state) => state.messages.selectedUser;
export const selectMessageText = (state) => state.messages.messageText;

export default messagesSlice.reducer;
