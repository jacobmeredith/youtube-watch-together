import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
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
      <Input 
        type='text'
        placeholder='Enter your nick name'
        value={nick}
        onInput={(e: any) => setNick(e.target.value)} />
      <Button type='submit' colorScheme='red'>Create room</Button>
    </form>
  )
}

export default CreateRoom;
