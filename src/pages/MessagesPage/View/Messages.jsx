import { Divider } from '@mui/material';
import React, { useEffect } from 'react';

import { CiSearch } from 'react-icons/ci';
import { FiSend } from 'react-icons/fi';
import { GrAttachment } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import ChatItem from '../../../components/ChatItem/View/ChatItem';
import { sendMessageAsync } from '../messagesSlice';
import { user as selectUser } from '../../SignInPage/signInSlice';
export default function Messages(props) {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {

  }, [])

  return (
    <div>
      <div className="messages-page">

        <div className="inbox-column">
          <h1>Gelen Kutusu</h1>
          <div className="inbox-search">
            <CiSearch className='inbox-search-icon' />
            <input className='inbox-search-input' />
          </div>
          <div className='inbox-users-container'>
            {props.chatUser && <ChatItem />}
            {/* {
              [0, 0, 0, 0, 0, 0, 0].map(e => {
                return <ChatItem />
              })
            } */}

          </div>
        </div>

        <div className="selected-chat">

          <div className="chat-user-info">
            <div className="chat-user-info-left">
              <img src="https://i.pravatar.cc/150?img=5" alt="" />
              <div className="chat-user-info-left-text">
                <h3>John Doe</h3>
                <p>Online</p>
              </div>
            </div>

          </div>

          <div className="chat-body">

          </div>

          <div className="chat-bottom">
            <div className="chat-text-field-container">
              <input type="text" className="chat-text-field" />
              <FiSend className='chat-send-icon' onClick={() => {
                dispatch(sendMessageAsync({
                  content: 'Hello',
                  receiverId: 'SVEyBFLZ16dHYGqOOfPEZA5KLEz2',
                  senderId: user.uid,
                  timestamp: new Date().getTime(),

                }))
              }} />
              <div className="chat-vertical-divider"></div>
              <GrAttachment className='chat-attachment-icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 