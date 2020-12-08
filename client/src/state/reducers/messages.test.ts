import reducer, { messagesInitialState } from './messages';

test('should set default state if no sate is passed', () => {
  const state = reducer(undefined, { type: '', payload: null });
  expect(state).toStrictEqual(messagesInitialState);
});

test('should return current state if no action type is matched', () => {
  const state = reducer(messagesInitialState, { type: '', payload: null });
  expect(state).toStrictEqual(messagesInitialState);
});

test('should add new message if add is true', () => {
  const state = reducer(messagesInitialState, { type: 'MESSAGES_UPDATE', payload: { message: { id: '1', content: 'Content', from: 'User 1' }, add: true } });
  expect(state.messages.length).toBe(1);
});

test('should not add new message if add is false', () => {
  const state = reducer(messagesInitialState, { type: 'MESSAGES_UPDATE', payload: { message: { id: '1', content: 'Content', from: 'User 1' }, add: false } });
  expect(state.messages.length).toBe(0);
});
