import React, { useEffect, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import socket from 'socket.io-client';

import { reducer, defaultState, IStateInterface } from './../state/state';

import Home from './Pages/Home';
import Room from './Pages/Room';

const App: React.FC<{ initialState: IStateInterface|null }> = ({ initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState||defaultState); // TODO: Make this able to be init from local storage

  useEffect(() => {
    const io = socket.io(process.env.REACT_APP_SOCKET_URL ? process.env.REACT_APP_SOCKET_URL : '');
    dispatch({ type: 'IO_CONNECTED', payload: io });

    io.on('NEW_ROOM', (e: any) => {
      dispatch({ type: 'ROOM_UPDATE', payload: e });
    });

    io.on('NEW_MESSAGE', (e: any) => {
      dispatch({ type: 'MESSAGE_RECIEVED', payload: e });
    });

    io.on('CHANGE_VIDEO', (e: any) => {
      dispatch({ type: 'VIDEO_RECIEVED', payload: e });
    });

    io.on('UPDATE_VIDEO', (e: any) => {
      dispatch({ type: 'VIDEO_EVENT', payload: e });
    });

    return () => {
      dispatch({ type: 'IO_CLOSE', payload: null });
      io.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={{}}>
      <Router>
        <Switch>
          <Route path='/room/:id' render={(props) => {
            return <Room
              {...props}
              video={state.video}
              state={state.state}
              time={state.time}
              room={state.room}
              user={state.user}
              messages={state.messages}
              onJoinRoom={(nick: string, id: string) => dispatch({ type: 'ROOM_JOIN', payload: { user: nick, room: id } })}
              onCreateMessage={(e: string) => dispatch({ type: 'MESSAGE_CREATE', payload: e })}
              onVideoChange={(e: string) => dispatch({ type: 'VIDEO_CHANGE', payload: e })}
              onVideoUpdate={(e: any) => dispatch({ type: 'VIDEO_UPDATE', payload: e })} />
          }} />
          {!state.room && <Route path='/' render={(props) => {
            return <Home {...props} onSubmit={(e: string) => dispatch({ type: 'ROOM_CREATE', payload: e })} />
          }} />}
          {state.room && <Redirect path='/' to={`/room/${state.room}`} />}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
