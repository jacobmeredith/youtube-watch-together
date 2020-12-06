import React from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';

import Player from './Player';
import Search from './Search';
import SearchError from './SearchError';

interface IVideoInterface {
  video: string,
  state: string,
  time: number,
  onVideoChange: Function,
  onVideoUpdate: Function
}

const Video: React.FC<IVideoInterface> = ({ video, state, time, onVideoChange, onVideoUpdate }) => {
  return (
    <VideoContainer className='video'>
      <Player
        id={video}
        state={state}
        time={time}
        onReady={(e: any) => onVideoUpdate({ type: 'onReady', time: e.target.getCurrentTime() })}
        onPlay={(e: any) => onVideoUpdate({ type: 'onPlay', time: e.target.getCurrentTime() })}
        onPause={(e: any) => onVideoUpdate({ type: 'onPause', time: e.target.getCurrentTime() })}
        onEnd={(e: any) => onVideoUpdate({ type: 'onEnd', time: e.target.getCurrentTime() })} />
      <ErrorBoundary FallbackComponent={SearchError}>
        <Search onVideoChange={onVideoChange} />
      </ErrorBoundary>
    </VideoContainer>
  )
}

const VideoContainer = styled.section`
  height: 100vh;
  flex-basis: 70%;
`;

export default Video;
