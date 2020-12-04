import React from 'react';

interface IMessageInterface {
  content: string
}

const Message: React.FC<IMessageInterface> = ({ content }) => {
  return (
    <div className='message'>{content}</div>
  )
}

export default Message;
