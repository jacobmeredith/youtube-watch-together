import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Card from './Card';

interface IListInterface {
  videos: Array<any>
}

const List: React.FC<IListInterface> = ({ videos }) => {
  const dispatch = useDispatch();

  const videosMap = videos
    .map(video => <Card
      key={video.id}
      {...video}
      onClick={() => dispatch({ type: 'ROOM_VIDEO_CREATE', payload: video.id })} />);

  return (
    <ListContainer className='list'>
      {videosMap}
    </ListContainer>
  )
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1em;
  flex: 1;
  overflow: auto;
  border-top: 1px solid lightgrey;
`;

export default List;
