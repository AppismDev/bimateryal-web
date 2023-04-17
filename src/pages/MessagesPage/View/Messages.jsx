import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

import { CiSearch } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import ChatItem from "../../../components/ChatItem/View/ChatItem";
import {
  addInbox,
  fetchInboxAsync,
  selectInbox,
  selectMessageText,
  selectSelectedInbox,
  selectSelectedUser,
  sendMessageAsync,
  setMessageText,
  setSelectedInbox,
  setSelectedUser,
} from "../messagesSlice";
import { user as selectUser } from "../../SignInPage/signInSlice";
import useQuery from "../../../utilities/customHooks/useQuery";
import { listenUserInbox, listenUserMessage } from "../messagesAPI";
import { Timestamp } from "firebase/firestore";
import ChatPage from "./ChatPage";
export default function Messages(props) {
  const dispatch = useDispatch();

  //oturum açmış kullanıcı
  const user = useSelector(selectUser);

  // inbox'ta seçili kullanıcı
  const selectedUser = useSelector(selectSelectedUser);

  const messageText = useSelector(selectMessageText);
  const inbox = useSelector(selectInbox);
  const selectedInbox = useSelector(selectSelectedInbox);

  const [emptyInbox, setEmptyInbox] = useState(undefined);
  useEffect(() => {
    console.log("CHANGEDDDDDDDDDDDD");
    listenUserInbox(user.uid, (inbox) => {
      console.log("inbox is changed", inbox);
      dispatch(addInbox(inbox));
    });
    if (props.location.state && props.location.state.user) {
      const emptyInboxData = {
        lastMessageTime: Timestamp.now(),
        uid: props.location.state.user.uid,
        lastMessage: {
          receiverId: props.location.state.user.uid,
          senderId: user.uid,
          media: null,
          text: "",
          id: "",
        },
      };
      dispatch(setSelectedInbox(emptyInboxData));
      setEmptyInbox(emptyInboxData);
    } else {
      console.log("no user");
    }

    // listenUserInbox(user.uid)
  }, [selectedInbox]);

  useEffect(() => {
    // if (selectedInbox && selectedInbox.lastMessageSenderId) {
    //   listenUserMessage(user.uid, selectedInbox.lastMessageSenderId, (value) => {
    //     console.log('message received : ', value)
    //   })
    // }
  }, [selectedInbox]);

  return (
    <div>
      <div className="messages-page">
        <div className="inbox-column">
          <h1>Gelen Kutusu</h1>
          <div className="inbox-search">
            <CiSearch className="inbox-search-icon" />
            <input val className="inbox-search-input" />
          </div>
          <div className="inbox-users-container">
            {/* {emptyInbox &&
              props.location.state &&
              props.location.state.user && (
                <ChatItem
                  inbox={emptyInbox}
                  onClick={(e) => {
                    dispatch(setSelectedInbox(emptyInbox));
                  }}
                />
              )} */}
            {
              // timestampe göre sırala ve map et
              inbox.map((inboxElement) => {
                return (
                  <ChatItem
                    inbox={inboxElement}
                    onClick={(e, data) => {
                      dispatch(setSelectedInbox(inboxElement));
                    }}
                  />
                );
              })
            }
          </div>
        </div>

        {selectedInbox ? (
          <ChatPage />
        ) : (
          <div className="selected-chat-empty">
            <h1>Bir görüşme seçin.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
