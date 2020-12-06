import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

interface IPlayerInterface {
  id: string,
  state: string,
  time: Number,
  onReady: any,
  onPlay: any,
  onPause: any,
  onEnd: any
}

const Player: React.FC<IPlayerInterface> = ({ id, state, time, onReady, onPlay, onPause, onEnd }) => {
  const element: any = useRef(null);

  useEffect(() => {
    element.current.getInternalPlayer().seekTo(time);
    if (state === 'onPlay') element.current.getInternalPlayer().playVideo();
    if (state === 'onPause') element.current.getInternalPlayer().pauseVideo();
  }, [state]);

  return (
    <PlayerContainer className='player' data-testid='player'>
      <YouTube
        className='player__frame'
        ref={element}
        videoId={id ? id : ''}
        opts={{ playerVars: { autoplay: 1 } }}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd} />
    </PlayerContainer>
  )
}

const PlayerContainer = styled.section`
  height: 60%;
  background-color: black;
  width: 100%;
  position: relative;
  padding-top: 35%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Player;
