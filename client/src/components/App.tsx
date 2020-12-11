import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { io } from '../state/socket';

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
    // TODO: Add test to catch the dispatch events
    io.on('CREATE_ROOM', (e: any) => dispatch({ type: 'ROOM_UPDATE', payload: e }));
    io.on('CREATE_MESSAGE', (e: any) => dispatch({ type: 'MESSAGES_UPDATE', payload: { message: e, add: user !== e.from }}));
    io.on('CHANGE_VIDEO', (e: any) => dispatch({ type: 'ROOM_VIDEO_UPDATE', payload: { video: e, add: video !== e }}));
    io.on('UPDATE_VIDEO', (e: any) => dispatch({ type: 'ROOM_STATE_UPDATE', payload: e }));

    return () => {
      // TODO: Close IO connection and emit event to clean-up on the server side
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path='/room/:id' render={(props) => <Room {...props} />} />
          {!room && <Route path='/' render={() => <Home />} />}
          {room && <Redirect path='/' to={`/room/${room}`} />}
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
