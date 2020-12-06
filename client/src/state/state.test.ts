import { defaultState, reducer } from './state';

test('should throw error when no action type is matched', () => {
  expect(() => reducer(defaultState, { type: 'RANDOM_ACTION', payload: null })).toThrow('Please provide an action type');
});

it('should update connection when IO_CONNECTED action is called', () => {
  const state = reducer(defaultState, { type: 'IO_CONNECTED', payload: { connection: true } });
  expect(state.connection).toStrictEqual({ connection: true } );
});

it('should update connection when IO_CLOSE action is called', () => {
  const state = reducer(defaultState, { type: 'IO_CLOSE', payload: { connection: false } });
  expect(state.connection).toStrictEqual({ connection: false } );
});

it('should update user when ROOM_CREATE is called', () => {
  const state = reducer(defaultState, { type: 'ROOM_CREATE', payload: 'Nick name' });
  expect(state.user).toBe('Nick name');
});

it('should update room when ROOM_UPDATE is called', () => {
  const state = reducer(defaultState, { type: 'ROOM_UPDATE', payload: 'room id 1' });
  expect(state.room).toBe('room id 1');
});

it('should update room and user when ROOM_JOIN is called', () => {
  const state = reducer(defaultState, { type: 'ROOM_JOIN', payload: { user: 'user 1', room: 'room 1' } });
  expect(state.room).toBe('room 1');
  expect(state.user).toBe('user 1');
});

it('should update room and user when MESSAGE_CREATE is called', () => {
  const state = reducer({ ...defaultState, user: 'user 1' }, { type: 'MESSAGE_CREATE', payload: 'This is a message' });
  expect(state.messages[0].content).toBe('This is a message');
  expect(state.messages[0].from).toBe('user 1');
});

it('should not add new message when MESSAGE_RECIEVED is called and the current user created it', () => {
  const state = reducer({ ...defaultState, user: 'user 1' }, { type: 'MESSAGE_RECIEVED', payload: { content: 'A new message', from: 'user 1' } });
  expect(state.messages.length).toBe(0);
  expect(state).toStrictEqual({ ...defaultState, user: 'user 1' });
});

it('should add new message when MESSAGE_RECIEVED is called and a different user created it', () => {
  const state = reducer({ ...defaultState, user: 'user 1' }, { type: 'MESSAGE_RECIEVED', payload: { content: 'A new message', from: 'user 2' } });
  expect(state.messages.length).toBe(1);
  expect(state.messages[0].content).toBe('A new message');
  expect(state.messages[0].from).toBe('user 2');
});
