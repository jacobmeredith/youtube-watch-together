import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import Message from './Message';
import Input from './Input';

export interface IChatInterface {
  user: string|null,
  messages: Array<{ id: string, content: string, from: string }>,
  onMessageAdd: Function,
}

const Chat: React.FC<IChatInterface> = ({ user, messages, onMessageAdd }) => {
  const container: any = useRef(null);

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages]);

  const messagesMap = messages.map((message, index) => (
    <Message key={index} user={user} from={message.from} content={message.content} />
  ));

  return (
    <ChatContainer className='chat'>
      <MessagesContainer ref={container}>
        <Messages>{messagesMap}</Messages>
      </MessagesContainer>
      <Input onMessageSubmit={onMessageAdd} />
    </ChatContainer>
  );
}

const ChatContainer = styled.aside`
  position: relative;
  border-left: 1px solid lightgrey;
  flex-basis: 30%;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow: auto;
  height: 100vh;
  max-height: 100vh;
  padding: .5em .5em 3.5em .5em;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
`;

export default Chat;
