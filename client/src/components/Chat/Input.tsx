import React, { useState } from 'react';
import styled from 'styled-components';

interface IInputInterface {
  onMessageSubmit: Function
}

const Input: React.FC<IInputInterface> = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState('');

  function handleSubmit(event: any): any {
    event.preventDefault();
    onMessageSubmit(message);
    setMessage('');
  }

  return (
    <InputForm className='chat-input' onSubmit={handleSubmit}>
      <MessageBox type='textarea' placeholder='Enter a message' value={message} onInput={(e: any) => setMessage(e.target.value)} />
      <SendButton>Send</SendButton>
    </InputForm>
  )
}

const InputForm = styled.form`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  border-top: 1px solid lightgrey;
  background-color: white;
`;

const MessageBox = styled.input`
  flex-grow: 1;
  border: none;
  padding: .5em;

  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  border: none;
  border-radius: 1em;
  padding: .5em 1em;
  margin: .5em;
  background-color: lightblue;
  color: white;
`;

export default Input;
