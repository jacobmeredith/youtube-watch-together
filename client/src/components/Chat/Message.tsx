import React from 'react';
import styled from 'styled-components';

interface IMessageInterface {
  user: string|null,
  from: string,
  content: string,
}

const Message: React.FC<IMessageInterface> = ({ user, from, content }) => {
  return user === from
    ? <UserMessage className='message message--user'>{content}</UserMessage>
    : <>
        <FromAuthor>{from}</FromAuthor>
        <FromMessage className='message message--from'>{content}</FromMessage>
      </>;
}

const DefaultMessage = styled.div`
  padding: .5em .75em;
  border-radius: 1em;
  margin-bottom: .5em;
  max-width: 80%;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FromAuthor = styled.small`
  margin-left: .5em;
  margin-bottom: .2em;
  color: lightgrey;
`;

const FromMessage = styled(DefaultMessage)`
  align-self: flex-start;
  background-color: lightgrey;
`;

const UserMessage = styled(DefaultMessage)`
  align-self: flex-end;
  background-color: lightblue;
  color: white;
`;

export default Message;
