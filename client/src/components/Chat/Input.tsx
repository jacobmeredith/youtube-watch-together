import React, { useState } from 'react';

interface IInputInterface {
  onMessageSubmit: Function
}

const Input: React.FC<IInputInterface> = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState('');

  function handleSubmit(event: any): any {
    event.preventDefault();
    onMessageSubmit(message);
  }

  return (
    <form className='message-input' onSubmit={handleSubmit}>
      <input type='textarea' placeholder='Enter a message' value={message} onInput={(e: any) => setMessage(e.target.value)} />
      <button>Send</button>
    </form>
  )
}

export default Input;
