import { put, takeLatest } from 'redux-saga/effects';

import { io } from '../socket';

export function* message_create(action: any) {
  yield io.emit('CREATE_MESSAGE', action.payload);
  yield put({ type: 'MESSAGES_UPDATE', payload: {  message: action.payload, add: true }});
}

export function* createMessage() {
  yield takeLatest('MESSAGE_CREATE', message_create);
}
