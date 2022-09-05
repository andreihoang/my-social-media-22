import React from 'react';
import {format} from 'timeago.js';

import './Message.scss';

const Message = ({ own, message }) => {
  
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className='messageTop'>
            <img className='messageImg' src='/assets/person/2.jpeg' alt=''/>
            <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message; 