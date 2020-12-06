import React, { useState } from 'react';

interface ICreateRoomInterface {
  onSubmit: Function
}

const CreateRoom: React.FC<ICreateRoomInterface> = ({ onSubmit }) => {
  const [nick, setNick] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(nick);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        placeholder='Enter your nick name'
        value={nick} 
        onInput={(e: any) => setNick(e.target.value)} />
      <button>Create room</button>
    </form>
  )
}

export default CreateRoom;
