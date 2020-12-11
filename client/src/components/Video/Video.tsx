import React from 'react';
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import Player from './Player';
import Search from './Search';
import SearchError from './SearchError';

const Video: React.FC = () => {
  return (
    <Box height='100vh' flexBasis='70%' className='video'>
      <Player />
      <ErrorBoundary FallbackComponent={SearchError}>
        <Search />
      </ErrorBoundary>
    </Box>
  )
}

const VideoContainer = styled.section`
  height: 100vh;
  flex-basis: 70%;
`;

export default Video;
