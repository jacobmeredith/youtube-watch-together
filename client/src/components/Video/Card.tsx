import React from 'react';
import { Fade, Box } from '@chakra-ui/react';

interface ICardInterface {
  id: string,
  thumbnail: string,
  title: string,
  onClick: any
}

const Card: React.FC<ICardInterface> = ({ thumbnail, title, onClick }) => {
  return (
    <Box className='card' flexBasis='23%' marginBottom='1em' alignItems='stretch' borderRadius='.5em' overflow='hidden' _hover={{ cursor: 'pointer' }} onClick={onClick}>
      <Fade in={true}>
        <Box width='100%' height='8em' style={{ backgroundImage: `url(${thumbnail})`, backgroundPosition: 'center center', backgroundSize: 'cover' }} />
        <Box padding='.5em' height='8em' backgroundColor='#f5f5f5'>
          <p>{title.slice(0, 50).trim()}{title.length > 50 ? '...' : ''}</p>
        </Box>
      </Fade>
    </Box>
  )
}

export default Card;
