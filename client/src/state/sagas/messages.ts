import { put, takeLatest } from 'redux-saga/effects';

import { io } from '../scoket';

function* message_create(action: any) {
  yield io.emit('CREATE_MESSAGE', action.payload);
  yield put({ type: 'MESSAGES_UPDATE', payload: action.payload });
}

export function* createMessage() {
  yield takeLatest('MESSAGE_CREATE', message_create);
}
