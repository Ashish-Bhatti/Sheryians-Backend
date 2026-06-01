import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log('a user connected')

  socket.on('message',(msg)=>{
    console.log(msg)
    io.emit('abc',msg)
  })
});

httpServer.listen(3000,()=>{
    console.log('sever is running on port 3000')
});