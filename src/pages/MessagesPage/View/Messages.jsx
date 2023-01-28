import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CiSearch } from 'react-icons/ci';
import ChatItem from '../../../components/ChatItem/View/ChatItem';

export default function messages() {
  return (
    <div>
      <div className="messages-page">

        <div className="inbox-column">
          <h1>Mesajlar</h1>
          <div className="inbox-search">
            <CiSearch className='inbox-search-icon' />
            <input className='inbox-search-input' />
          </div>
          <ChatItem />
        </div>

        <div className="selected-chat">

          <div className="chat-user-info">

          </div>
          <div className="chat-body">

          </div>

          <div className="chat-text-field"></div>
        </div>
      </div>
    </div>
  );
} 