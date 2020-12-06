import React, { useState } from 'react';

interface IJoinRoomInterface {
  onSubmit: Function
}

const JoinRoom: React.FC<IJoinRoomInterface> = ({ onSubmit }) => {
  const [nick, setNick] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(nick);
  }

  return (
    <form className='join-room' onSubmit={handleSubmit}>
      <input type='text' placeholder='Enter your nick name' value={nick} onInput={(e: any) => setNick(e.target.value)} />
      <button>Join room</button>
    </form>
  )
}

export default JoinRoom;
