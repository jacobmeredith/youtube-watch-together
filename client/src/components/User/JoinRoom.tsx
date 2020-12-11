import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

interface IJoinRoomInterface {
  roomId: string
}

const JoinRoom: React.FC<IJoinRoomInterface> = ({ roomId }) => {
  const dispatch = useDispatch();
  const [nick, setNick] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'ROOM_JOIN', payload: { user: nick, room: roomId } });
  }

  return (
    <form className='join-room' onSubmit={handleSubmit}>
      <Input type='text' placeholder='Enter your nick name' value={nick} onInput={(e: any) => setNick(e.target.value)} />
      <Button type='submit' colorScheme='red'>Join room</Button>
    </form>
  )
}

export default JoinRoom;
