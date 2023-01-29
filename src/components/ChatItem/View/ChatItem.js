import React from 'react'

export default function ChatItem() {
    return (

        <div className="chat-user-card">
            <img className="chat-user-card-image" src="https://i.pravatar.cc/150?img=5" alt="" />
            <div className="chat-user-card-info">
                <div className="chat-user-card-name">Ahmet</div>
                <div className="chat-user-card-last-message">Merhaba</div>
            </div>

            <div className='chat-user-trailing'>
                <div className="chat-user-card-message-count-badge">2</div>
                <div className="chat-user-card-time">12:00</div>
            </div>

        </div>
    )
}
