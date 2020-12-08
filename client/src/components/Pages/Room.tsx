import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Modal from '../Common/Modal';
import JoinRoom from '../User/JoinRoom';
import Video from './../Video/Video';
import Chat from '../Chat/Chat';

interface IRoomInterface {
  match: any
}

const Room: React.FC<IRoomInterface> = ({ match }) => {
  const [user, room] = [useSelector((state: any) => state.user.name), useSelector((state: any) => state.room.id)];
  
  return (
    <>
      {(!room && !user) && <Modal isOpen>
        <JoinRoom roomId={match.params.id} />
      </Modal>}
      {(room && user) && <RoomContainer>
        <Video />
        <Chat />
      </RoomContainer>}
    </>
  )
}

const RoomContainer = styled.main`
  display: flex;
`;

export default Room;
