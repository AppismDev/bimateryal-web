import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../Material/UserInfoCard/userInfoAPI";
import { getUserFromFirestore } from "../../../services/firebase/UserService.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedUser,
  setSelectedUser,
} from "../../../pages/MessagesPage/messagesSlice";

export default function ChatItem(props) {
  const dispatch = useDispatch();

  const selectedUser = useSelector(selectSelectedUser);
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("UID is, ", props.inbox.uid);
    getUserInfo(props.inbox.uid).then((user) => {
      setUser(user);
    });
  }, []);

  const inbox = props.inbox || undefined;

  return (
    <div
      className="chat-user-card"
      onClick={(e) => {
        props.onClick(e);
        dispatch(setSelectedUser(user));
      }}
    >
      <img
        className="chat-user-card-image"
        src={`${user ? user.photoUrl || user.photoURL : ""}`}
        alt=""
      />
      <div className="chat-user-card-info">
        <div className="chat-user-card-name">{user && user.displayName}</div>
        <div className="chat-user-card-last-message">
          {inbox ? inbox.lastMessage.text.slice(0, 24) ?? "-" : "-"}
        </div>
      </div>

      <div className="chat-user-trailing">
        <div className="chat-user-card-message-count-badge">2</div>
        <div className="chat-user-card-time">12:00</div>
      </div>
    </div>
  );
}
