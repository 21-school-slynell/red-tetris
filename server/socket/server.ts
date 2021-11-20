import { Server } from 'socket.io';
import { setupRoutes } from './routes';

export function createSocket() {
    const io = new Server({
        path: '/socket/',
        serveClient: false,
    });

    setupRoutes(io);

    return io;
}
