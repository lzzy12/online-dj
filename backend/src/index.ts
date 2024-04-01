import express, {Request, Response} from 'express';
import http from 'http';
import {Socket, Server as WServer} from 'socket.io';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { socketOnConnection } from './ws';
import searchRouter from './search';
import dotenv from 'dotenv';
import cors from 'cors';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io = new WServer(server);

// Enable CORS
app.use(cors());
dotenv.config();
// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(searchRouter)
// Serve static files from the public directory
app.use(express.static('public'));
// Socket.io connection handling
io.on('connection', (socket: Socket) => {
  console.log(socket.id);
  socketOnConnection(socket, io);
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
