import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';

const port = 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:6006'],
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  const name = uuid();
  socket.username = name;

  socket.on('NEW_ROOM', (data: any) => {
    socket.username = data;
    const id = uuid();
    socket.room = id;
    socket.join(id);
    io.to(id).emit('NEW_ROOM', id);
  });

  socket.on('JOIN_ROOM', (data: any) => {
    socket.username = data.user;
    socket.room = data.room;
    socket.join(data.room);
  });

  socket.on('NEW_MESSAGE', (data: any) => {
    socket.to(socket.room).emit('NEW_MESSAGE', data);
  });

  socket.on('CHANGE_VIDEO', (data: any) => {
    socket.to(socket.room).emit('CHANGE_VIDEO', data);
  });

  socket.on('UPDATE_VIDEO', (data: any) => {
    socket.to(socket.room).emit('UPDATE_VIDEO', data);
  });

  socket.on('disconnect', () => {
    // Close room
  });
});

httpServer.listen(port, () => console.log(`Running on port ${port}`));
