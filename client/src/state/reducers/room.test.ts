import reducer, { initialState } from './room';

test('should set default state if no sate is passed', () => {
  const state = reducer(undefined, { type: '', payload: null });
  expect(state).toStrictEqual(initialState);
});

test('should return current state if no action type is matched', () => {
  const state = reducer(initialState, { type: '', payload: null });
  expect(state).toStrictEqual(initialState);
});

test('should update the room id', () => {
  const state = reducer(initialState, { type: 'ROOM_UPDATE', payload: '1234' });
  expect(state.id).toBe('1234');
});

test('should update the video if add is true', () => {
  const state = reducer(initialState, { type: 'ROOM_VIDEO_UPDATE', payload: { video: 'videoid123', add: true } });
  expect(state.video).toBe('videoid123');
});

test('should not update the video if add is false', () => {
  const state = reducer(initialState, { type: 'ROOM_VIDEO_UPDATE', payload: { video: 'videoid123', add: false } });
  expect(state.video).toBe('');
});

test('should update the time and state', () => {
  const state = reducer(initialState, { type: 'ROOM_STATE_UPDATE', payload: { time: 1, state: 'onPause' } });
  expect(state.time).toBe(1);
  expect(state.state).toBe('onPause');
});

test('should reset the results if payload is null', () => {
  const state = reducer(initialState, { type: 'ROOM_RESULTS_UPDATE', payload: null });
  expect(state.results.next).toBe('');
  expect(state.results.videos).toStrictEqual([]);
});

test('should update the results if payload is not null', () => {
  const response = {
    data: {
      nextPageToken: '1234',
      items: [
        {
          prop1: 'property 1',
          prop2: 'property 2'
        }
      ]
    }
  }

  const state = reducer(initialState, { type: 'ROOM_RESULTS_UPDATE', payload: { response, type: 'get' } });
  expect(state.results.next).toBe(response.data.nextPageToken);
  expect(state.results.videos).toStrictEqual(response.data.items);
});

test('should add to the results if payload.type is not get', () => {
  const startingState = {
    ...initialState,
    results: {
      next: '5678',
      videos: [
        {
          prop1: 'property 3',
          prop2: 'property 4'
        }
      ]
    }
  }

  const response = {
    data: {
      nextPageToken: '1234',
      items: [
        {
          prop1: 'property 1',
          prop2: 'property 2'
        }
      ]
    }
  }

  const state = reducer(startingState, { type: 'ROOM_RESULTS_UPDATE', payload: { response, type: 'add' } });
  expect(state.results.next).toBe(response.data.nextPageToken);
  expect(state.results.videos).toStrictEqual([...startingState.results.videos, ...response.data.items]);
});
