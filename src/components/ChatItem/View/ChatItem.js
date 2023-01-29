import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../../Material/UserInfoCard/userInfoAPI'

export default function ChatItem(props) {


    const lastMessage = props.lastMessage || undefined


    return (
        <div className="chat-user-card" onClick={props.onClick}>
            <img className="chat-user-card-image" src={`${lastMessage.senderPhotoUrl ?? ""}`} alt="" />
            <div className="chat-user-card-info">
                <div className="chat-user-card-name">{lastMessage ? lastMessage.senderName : "Undef"}</div>
                <div className="chat-user-card-last-message">{lastMessage ? lastMessage.lastMessage ?? "-" : "-"}</div>
            </div>

            <div className='chat-user-trailing'>
                <div className="chat-user-card-message-count-badge">2</div>
                <div className="chat-user-card-time">12:00</div>
            </div>

        </div>
    )
}
