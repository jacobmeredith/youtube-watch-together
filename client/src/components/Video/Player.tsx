import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import YouTube from 'react-youtube';

const Player: React.FC = () => {
  const element: any = useRef(null);
  const dispatch = useDispatch();
  const [id, state, time] = [
    useSelector((state: any) => state.room.video),
    useSelector((state: any) => state.room.state),
    useSelector((state: any) => state.room.time)
  ];

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
        videoId={id}
        opts={{ playerVars: { autoplay: 1 } }}
        onReady={(e) => dispatch({ type: 'ROOM_STATE_CHANGE', payload: { state: 'onReady', time: e.target.getCurrentTime() } })}
        onPlay={(e) => dispatch({ type: 'ROOM_STATE_CHANGE', payload: { state: 'onPlay', time: e.target.getCurrentTime() } })}
        onPause={(e) => dispatch({ type: 'ROOM_STATE_CHANGE', payload: { state: 'onPause', time: e.target.getCurrentTime() } })}
        onEnd={(e) => dispatch({ type: 'ROOM_STATE_CHANGE', payload: { state: 'onEnd', time: e.target.getCurrentTime() } })} />
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
