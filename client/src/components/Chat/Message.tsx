import React from 'react';
import { Box, VStack } from '@chakra-ui/react';

interface IMessageInterface {
  user: string|null,
  from: string,
  content: string,
}

const Message: React.FC<IMessageInterface> = ({ user, from, content }) => {
  const authorProps = {
    marginTop: '0',
    alignSelf: 'flex-start',
    padding: user === from ? '0 .5em 0 0' : '0 0 0 .5em',
    fontSize: '.8em'
  }

  const messageProps = {
    padding: '.5em .75em',
    borderRadius: '1em',
    maxWidth: '80%',
    alignItems: 'flex-start',
    marginBottom: user === from ? '1em' : '0',
    alignSelf: user === from ? 'flex-end' : 'flex-start',
    color: user === from ? 'white' : 'black',
    background: user === from ? '#E53E3E' : 'lightgrey',
  }

  return (
    <>
      {user !== from  && <Box {...authorProps}>{from}</Box>}
      <VStack className={user === from ? 'message--user' : 'message--from'} {...messageProps}>{content.split('\n').map(item => <span key={item} style={{ marginTop: 0 }}>{item}</span>)}</VStack>
    </>
  )
}

export default Message;
