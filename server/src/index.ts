import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const port = 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('connection')

  socket.on('disconnect', () => {
    console.log('disconnect')
  });
});

httpServer.listen(port, () => console.log(`Running on port ${port}`));
