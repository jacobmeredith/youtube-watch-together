import React from 'react';
import styled from 'styled-components';

import Modal from '../Common/Modal';
import JoinRoom from '../User/JoinRoom';
import Video from './../Video/Video';
import Chat from '../Chat/Chat';

interface IRoomInterface {
  match: any,
  video: string,
  state: string,
  time: number,
  room: string|null,
  user: string|null,
  messages: Array<any>,
  onJoinRoom: Function,
  onCreateMessage: Function,
  onVideoChange: Function,
  onVideoUpdate: Function
}

const Room: React.FC<IRoomInterface> = ({ match, video, state, time, room, user, messages, onJoinRoom, onCreateMessage, onVideoChange, onVideoUpdate }) => {
  return (
    <>
      {(!room && !user) && <Modal isOpen>
        <JoinRoom onSubmit={(e: any) => onJoinRoom(e, match.params.id)} />
      </Modal>}
      {(room && user) && <RoomContainer>
        <Video video={video} state={state} time={time} onVideoChange={onVideoChange} onVideoUpdate={onVideoUpdate} />
        <Chat user={user} messages={messages} onMessageAdd={(e: any) => onCreateMessage(e)} />
      </RoomContainer>}
    </>
  )
}

const RoomContainer = styled.main`
  display: flex;
`;

export default Room;
