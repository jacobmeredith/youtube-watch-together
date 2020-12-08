import React from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import Player from './Player';
import Search from './Search';
import SearchError from './SearchError';

const Video: React.FC = () => {
  return (
    <VideoContainer className='video'>
      <Player />
      <ErrorBoundary FallbackComponent={SearchError}>
        <Search />
      </ErrorBoundary>
    </VideoContainer>
  )
}

const VideoContainer = styled.section`
  height: 100vh;
  flex-basis: 70%;
`;

export default Video;
