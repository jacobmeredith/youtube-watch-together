import reducer, { initialState } from './user';

test('should set default state if no sate is passed', () => {
  const state = reducer(undefined, { type: '', payload: null });
  expect(state).toStrictEqual(initialState);
});

test('should return current state if no action type is matched', () => {
  const state = reducer(initialState, { type: '', payload: null });
  expect(state).toStrictEqual(initialState);
});

test('should update name', () => {
  const state = reducer(initialState, { type: 'USER_NAME_UPDATE', payload: 'User 1' });
  expect(state.name).toBe('User 1');
});
