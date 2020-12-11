import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/react';

import Card from './Card';

interface IListInterface {
  style: any,
  videos: Array<any>
}

const List: React.FC<IListInterface> = ({ style, videos }) => {
  const dispatch = useDispatch();

  const videosMap = videos
    .map(video => <Card
      key={video.id}
      {...video}
      onClick={() => dispatch({ type: 'ROOM_VIDEO_CREATE', payload: video.id })} />);

  return (
    <Flex className='list' style={{ marginTop: 0, ...style }} flexWrap='wrap' justifyContent='space-between' padding='1em'>
      {videosMap}
    </Flex>
  )
}

export default List;
