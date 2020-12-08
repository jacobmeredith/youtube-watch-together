import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

import reportWebVitals from './reportWebVitals';
import App from './components/App';

import './index.css';

import user from './state/reducers/user';
import messages from './state/reducers/messages';
import room from './state/reducers/room';

import { createRoom, joinRoom, createVideoRoom, changeStateRoom, changeResultsRoom } from './state/sagas/room';
import { createMessage } from './state/sagas/messages';

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({ user, messages, room });
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(createRoom);
sagaMiddleware.run(joinRoom);
sagaMiddleware.run(createMessage);
sagaMiddleware.run(createVideoRoom);
sagaMiddleware.run(changeStateRoom);
sagaMiddleware.run(changeResultsRoom);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
