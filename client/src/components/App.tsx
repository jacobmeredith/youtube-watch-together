import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { io } from '../state/scoket';

import Home from './Pages/Home';
import Room from './Pages/Room';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [user, room, video] = [
    useSelector((state: any) => state.user.name),
    useSelector((state: any) => state.room.id),
    useSelector((state: any) => state.room.video),
  ];
  
  useEffect(() => {
    // dispatch({ type: 'IO_CONNECTED', payload: io });

    io.on('CREATE_ROOM', (e: any) => {
      dispatch({ type: 'ROOM_UPDATE', payload: e });
    });

    io.on('CREATE_MESSAGE', (e: any) => {
      if (e.from !== user)
        dispatch({ type: 'MESSAGES_UPDATE', payload: e });
    });

    io.on('CHANGE_VIDEO', (e: any) => {
      if (e !== video)
        dispatch({ type: 'ROOM_VIDEO_UPDATE', payload: e });
    });

    io.on('UPDATE_VIDEO', (e: any) => {
      dispatch({ type: 'ROOM_STATE_UPDATE', payload: e });
    });

    return () => {
      // dispatch({ type: 'IO_CLOSE', payload: null });
      // io.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={{}}>
      <Router>
        <Switch>
          <Route path='/room/:id' render={(props) => <Room {...props} />} />
          {!room && <Route path='/' render={() => <Home />} />}
          {room && <Redirect path='/' to={`/room/${room}`} />}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
