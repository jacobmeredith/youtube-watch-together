import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Input from './Input';
import List from './List';

const count = 24;

function formatResults(videos: any): Array<any> {
  return videos.map((item: any) => {
    return { id: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.high.url };
  });
}

interface ISearchInterface {
  onVideoChange: Function
}

const Search: React.FC<ISearchInterface> = ({ onVideoChange }) => {
  const [response, setResponse] = useState<{ nextPage: string, videos: Array<any> }>({
    nextPage: '',
    videos: [] 
  });

  const [query, setQuery] = useState<{ keyword: string, type: string }>({
    keyword: '',
    type: 'get',
  });

  useEffect((): any => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      axios.get(`https://www.googleapis.com/youtube/v3/search?q=${query.keyword}&part=snippet&maxResults=${count}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&type=video&pageToken=${response.nextPage}&order=relevance`, { cancelToken: source.token })
        .then(result => {
          let videos = [...response.videos];

          query.type === 'get' 
            ? videos =formatResults(result.data.items)
            : videos = [...videos, ...formatResults(result.data.items)];

          setResponse({
            nextPage: result.data.nextPageToken,
            videos: videos
          });
        })
        .catch(error => {
          if (!axios.isCancel(error)) {
            throw error;
          }
        });
    };

    loadData();

    return () => {
      source.cancel();
    }
  }, [query]);

  return (
    <SearchContainer className='search'>
      <Input onSearch={(e: string) => setQuery({ keyword: e, type: 'get' })} />
      <List videos={response.videos} onVideoChange={onVideoChange} />
      {response.videos.length > 0 && <button type='button' onClick={() => setQuery({ ...query, type: 'add' })}>Load more</button>}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
`;

export default Search;
