import { put, takeLatest } from 'redux-saga/effects';
import { mocked } from 'ts-jest/utils';
import { io } from '../socket';

import { createMessage, message_create } from './messages';

const mockedFunction = jest.fn();

let mockedIo: any;

beforeEach(() => {
  mockedIo = mocked(io).emit = mockedFunction;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('should call emit CREATE_MESSAGE event and put MESSAGES_UPDATE with payload', () => {
  const gen = message_create({ type: 'ANY', payload: 'PAYLOAD' });
  gen.next();
  expect(mockedFunction).toHaveBeenCalledWith('CREATE_MESSAGE', 'PAYLOAD');
  expect(gen.next().value).toEqual(put({ type: 'MESSAGES_UPDATE', payload: {  message: 'PAYLOAD', add: true }}));
});

test('should call message_create function', () => {
  const gen = createMessage();
  expect(gen.next().value).toEqual(takeLatest('MESSAGE_CREATE', message_create));
});
