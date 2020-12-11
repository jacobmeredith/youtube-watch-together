import React, { useState } from 'react';
import { Box, HStack, Textarea, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Input: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.name);
  const [message, setMessage] = useState('');

  function sendData() {
    if (message) {
      dispatch({ type: 'MESSAGE_CREATE', payload: { id: '', content: message, from: user } });
      setMessage('');
    }
  }

  function handleSubmit(event: any): any {
    event.preventDefault();
    sendData();
  }

  function handleKeyDown(event: any) {
    if(event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      sendData();
    }
  }

  return (
    <Box position='absolute' bottom='0' width='100%' display='flex' borderTop='1px solid lightgrey' background='white'>
      <form className='chat-input' style={{ width: '100%' }} onSubmit={handleSubmit}>
        <HStack spacing='0' width='100%' paddingY='.5em' paddingRight='.5em'>
          <Textarea
            borderRadius='0'
            border='none'
            focusBorderColor='none'
            cols={1}
            resize='none'
            height='auto'
            minHeight='0'
            paddingY='0'
            placeholder='Enter a message'
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e: any) => setMessage(e.target.value)} />
          <Button type='submit' colorScheme='red'>Send</Button>
        </HStack>
      </form>
    </Box>
  )
}

export default Input;
