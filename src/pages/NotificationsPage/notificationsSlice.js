import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setNotificationAsReaded } from "./notificationsAPI";

const initialState = {
  notifications: [],
  isLoading: false,
  error: null,
};

export const setNotificationAsReadedAsync = createAsyncThunk(
  "notifications/setNotificationAsReadedAsync",
  async (notificationId) => {
    // wait for 5 seconds to simulate a slow network
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await setNotificationAsReaded(notificationId);
    return notificationId;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      // state.notifications = action.payload;
      // add new notifications to the beginning of the list
      state.notifications = [...action.payload, ...state.notifications];
    },
  },
  extraReducers: {
    [setNotificationAsReadedAsync.fulfilled]: (state, action) => {
      // update notification as readed
      const notificationId = action.payload;
      const notificationIndex = state.notifications.findIndex(
        (notification) => notification.id === notificationId
      );
      state.notifications[notificationIndex].isRead = true;
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;
export const selectNotifications = (state) => state.notifications.notifications;

export default notificationsSlice.reducer;
