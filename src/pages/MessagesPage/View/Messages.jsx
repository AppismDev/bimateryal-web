import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CiSearch } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { GrAttachment } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import ChatItem from '../../../components/ChatItem/View/ChatItem';
import { addInbox, fetchInboxAsync, selectInbox, selectMessageText, selectSelectedInbox, selectSelectedUser, sendMessageAsync, setMessageText, setSelectedInbox, setSelectedUser } from '../messagesSlice';
import { user as selectUser } from '../../SignInPage/signInSlice';
import useQuery from '../../../utilities/customHooks/useQuery';
import { listenUserInbox, listenUserMessage } from '../messagesAPI';
export default function Messages(props) {

  const dispatch = useDispatch();

  //oturum açmış kullanıcı
  const user = useSelector(selectUser);

  // inbox'ta seçili kullanıcı
  const selectedUser = useSelector(selectSelectedUser)

  const messageText = useSelector(selectMessageText)
  const inbox = useSelector(selectInbox)
  const selectedInbox = useSelector(selectSelectedInbox)

  const [emptyInbox, setEmptyInbox] = useState(undefined)
  useEffect(() => {

    listenUserInbox(user.uid, (inbox) => {
      console.log("inbox is changed", inbox)
      dispatch(addInbox(inbox))
    })
    if (props.location.state && props.location.state.user) {
      const emptyInboxData = {
        lastMessageSenderId: props.location.state.user.uid,
        lastMessage: undefined,
        lastMessageTimestamp: new Date().getTime(),
        senderName: props.location.state.user.displayName,
        senderPhotoUrl: props.location.state.user.photoUrl,
        lastMessageId: undefined,

      }
      dispatch(setSelectedInbox(emptyInboxData))
      setEmptyInbox(emptyInboxData)
    } else {
      console.log('no user')
    }

    // listenUserInbox(user.uid)

  }, [])

  useEffect(() => {
    // if (selectedInbox && selectedInbox.lastMessageSenderId) {
    //   listenUserMessage(user.uid, selectedInbox.lastMessageSenderId, (value) => {
    //     console.log('message received : ', value)
    //   })
    // }

  }, [selectedInbox])


  return (
    <div>
      <div className="messages-page">

        <div className="inbox-column">
          <h1>Gelen Kutusu</h1>
          <div className="inbox-search">
            <CiSearch className='inbox-search-icon' />
            <input val className='inbox-search-input' />
          </div>
          <div className='inbox-users-container'>
            {
              emptyInbox && props.location.state && props.location.state.user && <ChatItem lastMessage={emptyInbox} onClick={(e) => {
                dispatch(setSelectedInbox(emptyInbox))
              }} />
            }
            {
              // timestampe göre sırala ve map et
              inbox.map(inboxElement => {
                return <ChatItem lastMessage={inboxElement} onClick={(e) => {
                  dispatch(setSelectedInbox(inboxElement))
                }} />
              })
            }

          </div>
        </div>

        {selectedInbox ?
          <div className="selected-chat">

            <div className="chat-user-info">
              {selectedInbox && <div className="chat-user-info-left">
                <img src={`${selectedInbox.senderPhotoUrl}`} alt="" />
                <div className="chat-user-info-left-text">
                  <h3>{selectedInbox.senderName}</h3>
                  <p>Online</p>
                </div>
              </div>}


            </div>

            <div className="chat-body">

            </div>

            <div className="chat-bottom">
              <div className="chat-text-field-container">
                <input value={messageText}
                  onChange={(e) => {
                    dispatch(setMessageText(e.target.value))
                  }}
                  type="text" className="chat-text-field" />
                <FiSend className='chat-send-icon' onClick={() => {
                  console.log('PHOTO URL : ', user)
                  dispatch(sendMessageAsync({
                    content: messageText,
                    receiverId: selectedInbox.lastMessageSenderId,
                    senderPhotoUrl: user.photoUrl,
                    senderName: user.displayName || user.email,
                    senderId: user.uid,
                    timestamp: new Date().getTime(),

                  }))
                }} />
                <div className="chat-vertical-divider"></div>
                <GrAttachment className='chat-attachment-icon' />
              </div>
            </div>
          </div> :
          <div className="selected-chat-empty">
            <h1>Bir görüşme seçin.</h1>
          </div>}
      </div>
    </div>
  );
} 