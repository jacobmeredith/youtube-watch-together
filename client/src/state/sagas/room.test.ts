import { put, takeLatest } from 'redux-saga/effects';
import { mocked } from 'ts-jest/utils';
import { io } from '../socket';
import { client } from '../axios';

import { 
  createRoom,
  room_create,
  joinRoom,
  room_join,
  createVideoRoom,
  room_video_create,
  changeStateRoom,
  room_state_change,
  changeResultsRoom,
  room_results_change } from './room';

let mockedIoFunction: any = jest.fn();
let mockedAxiosFunction: any = jest.fn();

let mockedIo: any;
let mockedAxios: any;

beforeEach(() => {
  mockedIo = mocked(io).emit = mockedIoFunction;
  mockedAxios = mocked(client).get = mockedAxiosFunction;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('should call emit CREATE_ROOM event and put USER_NAME_UPDATE with payload', () => {
  const gen = room_create({ type: 'ANY', payload: 'PAYLOAD' });
  gen.next();
  expect(mockedIoFunction).toHaveBeenCalledWith('CREATE_ROOM', 'PAYLOAD');
  expect(gen.next().value).toEqual(put({ type: 'USER_NAME_UPDATE', payload: 'PAYLOAD' }));
});

test('should call room_create function', () => {
  const gen = createRoom();
  expect(gen.next().value).toEqual(takeLatest('ROOM_CREATE', room_create));
});

test('should call emit JOIN_ROOM event and put USER_NAME_UPDATE/ROOM_UPDATE with payload', () => {
  const gen = room_join({ type: 'ANY', payload: { user: 'USER', room: 'ROOM' } });
  gen.next();
  expect(mockedIoFunction).toHaveBeenCalledWith('JOIN_ROOM', { user: 'USER', room: 'ROOM' });
  expect(gen.next().value).toEqual(put({ type: 'USER_NAME_UPDATE', payload: 'USER' }));
  expect(gen.next().value).toEqual(put({ type: 'ROOM_UPDATE', payload: 'ROOM' }));
});

test('should call room_join function', () => {
  const gen = joinRoom();
  expect(gen.next().value).toEqual(takeLatest('ROOM_JOIN', room_join));
});

test('should call emit CHANGE_VIDEO event and put USER_NAME_UPDATE with payload', () => {
  const gen = room_video_create({ type: 'ANY', payload: 'PAYLOAD' });
  gen.next();
  expect(mockedIoFunction).toHaveBeenCalledWith('CHANGE_VIDEO', 'PAYLOAD');
  expect(gen.next().value).toEqual(put({ type: 'ROOM_VIDEO_UPDATE', payload: { video: 'PAYLOAD', add: true } }));
});

test('should call room_video_create function', () => {
  const gen = createVideoRoom();
  expect(gen.next().value).toEqual(takeLatest('ROOM_VIDEO_CREATE', room_video_create));
});

test('should call emit UPDATE_VIDEO event and put ROOM_STATE_UPDATE with payload', () => {
  const gen = room_state_change({ type: 'ANY', payload: 'PAYLOAD' });
  gen.next();
  expect(mockedIoFunction).toHaveBeenCalledWith('UPDATE_VIDEO', 'PAYLOAD');
  expect(gen.next().value).toEqual(put({ type: 'ROOM_STATE_UPDATE', payload: 'PAYLOAD' }));
});

test('should call room_state_change function', () => {
  const gen = changeStateRoom();
  expect(gen.next().value).toEqual(takeLatest('ROOM_STATE_CHANGE', room_state_change));
});

test('should call axios.get and put ROOM_RESULTS_UPDATE with payload', () => {
  const gen = room_results_change({ type: 'ANY', payload: { type: 'TYPE', keyword: '' } });
  gen.next();
  gen.next();
  expect(mockedAxiosFunction).toHaveBeenCalled();
  expect(gen.next().value).toEqual(put({ type: 'ROOM_RESULTS_UPDATE', payload: { response: undefined, type: 'TYPE' } }));
});

// TODO: Add test for when axios throws an error

test('should call room_results_change function', () => {
  const gen = changeResultsRoom();
  expect(gen.next().value).toEqual(takeLatest('ROOM_RESULTS_CHANGE', room_results_change));
});
