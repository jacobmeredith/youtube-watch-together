import React, { useEffect, useRef } from 'react';
import { Box, VStack } from '@chakra-ui/react';
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
    <Box className='chat' position='fixed' borderLeft='1px solid lightgrey' width='30%' right='0' top='0' height='100vh'>
      <VStack width='100%' height='100vh' overflow='auto' paddingX='1em' paddingTop='1em' paddingBottom='4.5em' ref={container}>
        {messagesMap}
      </VStack>
      <Input />
    </Box>
  );
}

export default Chat;
