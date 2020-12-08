import React, { useState } from 'react';
import { useDispatch} from 'react-redux';

const CreateRoom: React.FC = () => {
  const dispatch = useDispatch();
  const [nick, setNick] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'ROOM_CREATE', payload: nick });
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
