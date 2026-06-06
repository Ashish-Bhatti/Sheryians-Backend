import 'dotenv/config';
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import http from 'http';
import { initSocket } from './src/sockets/server.socket.js';

const httpServer = http.createServer(app);

initSocket(httpServer);

connectToDB();
httpServer.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
