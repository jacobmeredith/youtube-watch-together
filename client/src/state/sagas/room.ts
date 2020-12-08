import { put, takeLatest, select } from 'redux-saga/effects';

import { io } from '../scoket';
import { client } from '../axios';

function* room_create(action: any) {
  yield io.emit('CREATE_ROOM', action.payload);
  yield put({ type: 'USER_NAME_UPDATE', payload: action.payload });
}

function* room_join(action: any) {
  yield io.emit('JOIN_ROOM', action.payload);
  yield put({ type: 'USER_NAME_UPDATE', payload: action.payload.user });
  yield put({ type: 'ROOM_UPDATE', payload: action.payload.room });
}

function* room_video_create(action: any) {
  yield io.emit('CHANGE_VIDEO', action.payload);
  yield put({ type: 'ROOM_VIDEO_UPDATE', payload: action.payload });
}

function* room_state_change(action: any) {
  yield io.emit('UPDATE_VIDEO', action.payload);
  yield put({ type: 'ROOM_STATE_UPDATE', payload: action.payload });
}

function* room_results_change(action: any) {
  try {
    const next = yield select((state) => state.room.results.next);
    const response = yield client.get(`https://www.googleapis.com/youtube/v3/search?q=${action.payload.keyword}&part=snippet&maxResults=${20}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&type=video&pageToken=${next}&order=relevance`);
    yield put({ type: 'ROOM_RESULTS_UPDATE', payload: { response, type: action.payload.type } });
  } catch(e) {
    yield put({ type: 'ROOM_RESULTS_UPDATE', payload: null });
  }
}

export function* createRoom() {
  yield takeLatest('ROOM_CREATE', room_create);
}

export function* joinRoom() {
  yield takeLatest('ROOM_JOIN', room_join);
}

export function* createVideoRoom() {
  yield takeLatest('ROOM_VIDEO_CREATE', room_video_create);
}

export function* changeStateRoom() {
  yield takeLatest('ROOM_STATE_CHANGE', room_state_change);
}

export function* changeResultsRoom() {
  yield takeLatest('ROOM_RESULTS_CHANGE', room_results_change);
}
