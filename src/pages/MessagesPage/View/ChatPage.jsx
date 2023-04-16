import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { user as selectUser } from "../../SignInPage/signInSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInbox,
  selectMessageText,
  selectSelectedInbox,
  selectSelectedUser,
  sendMessageAsync,
  setMessageText,
  setSelectedUser,
} from "../messagesSlice";

import { Timestamp } from "firebase/firestore";
import { getUserInfo } from "../../../components/Material/UserInfoCard/userInfoAPI";
import { listenUserChatWithAnotherUser } from "../messagesAPI";

export default function ChatPage() {
  const dispatch = useDispatch();

  //oturum açmış kullanıcı
  const user = useSelector(selectUser);

  // inbox'ta seçili kullanıcı
  const selectedUser = useSelector(selectSelectedUser);

  const messageText = useSelector(selectMessageText);
  const selectedInbox = useSelector(selectSelectedInbox);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedUser) {
      console.log("buragirdik22");
      console.log(`inbox id is ${selectedInbox.uid}`);
      getUserInfo(selectedInbox.uid).then((fetchedUser) => {
        console.log("user is ", user);
        dispatch(setSelectedUser(fetchedUser));

        listenUserChatWithAnotherUser(user.uid, fetchedUser.uid, (data) => {
          console.log("data is ", data);
          setMessages(data);
        });
      });
    } else {
      listenUserChatWithAnotherUser(user.uid, selectedUser.uid, (data) => {
        console.log("data is ", data);
        setMessages(data);
      });
    }
  }, []);

  return (
    <div className="selected-chat">
      <div className="chat-user-info">
        {selectedInbox && (
          <div className="chat-user-info-left">
            <img
              src={`${
                selectedUser && (selectedUser.photoUrl || selectedUser.photoURL)
              }`}
              alt=""
            />
            <div className="chat-user-info-left-text">
              <h3>{selectedUser && selectedUser.displayName}</h3>
              <p>Online</p>
            </div>
          </div>
        )}
      </div>

      <div className="chat-body">
        {messages &&
          messages.map((message) => {
            return (
              <div
                className={`chat-bubble ${
                  message.senderId == user.uid ? "right" : "left"
                }`}
              >
                {message.text}
              </div>
            );
          })}
      </div>

      <div className="chat-bottom">
        <div className="chat-text-field-container">
          <input
            value={messageText}
            onChange={(e) => {
              dispatch(setMessageText(e.target.value));
            }}
            type="text"
            className="chat-text-field"
          />
          <FiSend
            className="chat-send-icon"
            onClick={() => {
              console.log("PHOTO URL : ", user);
              dispatch(
                sendMessageAsync({
                  content: messageText,
                  receiverId: selectedUser.uid,
                  senderPhotoUrl: user.photoUrl,
                  senderName: user.displayName || user.email,
                  senderId: user.uid,
                  timestamp: Timestamp.now(),
                })
              );
            }}
          />
          <div className="chat-vertical-divider"></div>
          <GrAttachment className="chat-attachment-icon" />
        </div>
      </div>
    </div>
  );
}
