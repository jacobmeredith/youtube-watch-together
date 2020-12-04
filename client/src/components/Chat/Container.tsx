import React from 'react';
import Message from './Message';

interface IContainerInterface {
  messages: Array<{ id: string, content: string, user: string }>
}

const Container: React.FC<IContainerInterface> = ({ messages }) => {
  const messagesMap = messages.map(message => (
    <Message key={message.id} content={message.content} />
  ));

  return <div className='message-container'>{messagesMap}</div>;
}

export default Container;
