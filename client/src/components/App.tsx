import React, { useEffect } from 'react';
import socket from 'socket.io-client';

const App: React.FC = () => {
  useEffect(() => {
    const io = socket.io('http://localhost:5000');
    io.on('connection', () => console.log('connected'));

    return () => {
      io.close();
    };
  }, []);

  return (
    <div className='App'>
      app
    </div>
  );
}

export default App;
