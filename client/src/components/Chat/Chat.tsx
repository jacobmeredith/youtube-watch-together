import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Message from './Message';
import Input from './Input';

const Chat: React.FC = () => {
  const [user, messages] = [
    useSelector((state: any) => state.user.name),
    useSelector((state: any) => state.messages.messages)
  ];
  const container: any = useRef(null);

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages]);

  const messagesMap = messages.map((message: any, index: number) => (
    <Message key={index} user={user} from={message.from} content={message.content} />
  ));

  return (
    <ChatContainer className='chat'>
      <MessagesContainer ref={container}>
        <Messages>{messagesMap}</Messages>
      </MessagesContainer>
      <Input />
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
