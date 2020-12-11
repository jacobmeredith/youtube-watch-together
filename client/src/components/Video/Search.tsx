import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VStack, Button } from '@chakra-ui/react';

import Input from './Input';
import List from './List';

function formatResults(videos: any): Array<any> {
  return videos.map((item: any) => {
    return { id: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.high.url };
  });
}

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [sticky, setSticky] = useState(false);
  const ref: any = useRef(null);
  const videos = useSelector((state: any) => state.room.results.videos);

  const [query, setQuery] = useState<{ keyword: string, type: string }>({
    keyword: '',
    type: 'get',
  });

  function handleScroll(event: any) {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  useEffect((): any => {
   dispatch({ type: 'ROOM_RESULTS_CHANGE', payload: { keyword: query.keyword, type: query.type } });
  }, [query]);

  return (
    <VStack style={{ marginTop: 0 }} height={sticky ? '' : '40%'} paddingBottom='1em' className='search' ref={ref}>
      <Input
        style={{ position: sticky ? 'fixed' : 'relative', top: '0', left: 0, width: sticky ? '70%' : '100%' }}
        onSearch={(e: string) => setQuery({ keyword: e, type: 'get' })} />
      <List style={{ paddingTop: sticky ? `calc(${ref.current.firstChild.offsetHeight}px + .5em)` : '.5em' }} videos={formatResults(videos)} />
      {videos.length > 0 && <Button colorScheme='red' type='button' onClick={() => setQuery({ ...query, type: 'add' })}>Load more</Button>}
    </VStack>
  )
}

export default Search;
