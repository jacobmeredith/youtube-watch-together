import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Input from './Input';
import List from './List';


function formatResults(videos: any): Array<any> {
  return videos.map((item: any) => {
    return { id: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.high.url };
  });
}

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state: any) => state.room.results.videos);

  const [query, setQuery] = useState<{ keyword: string, type: string }>({
    keyword: '',
    type: 'get',
  });

  useEffect((): any => {
   dispatch({ type: 'ROOM_RESULTS_CHANGE', payload: { keyword: query.keyword, type: query.type } });
  }, [query]);

  return (
    <SearchContainer className='search'>
      <Input onSearch={(e: string) => setQuery({ keyword: e, type: 'get' })} />
      <List videos={formatResults(videos)} />
      {videos.length > 0 && <button type='button' onClick={() => setQuery({ ...query, type: 'add' })}>Load more</button>}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
`;

export default Search;
