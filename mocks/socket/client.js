/* eslint-disable no-console */
const io = require('socket.io-client');
const cluster = require('cluster');
const argv = require('minimist')(process.argv.slice(2));

const {
    host = 'http://localhost:8000',
    path = '/socket/',
    cookie = '',
    workers = 5,
    sockets = 1,
} = argv;

if (cluster.isMaster) {
    console.log('Started cluster', host, path, workers, sockets);

    for (let i = 0; i < workers; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.id} died`);
    });
} else if (cluster.isWorker) {
    console.log(`worker ${cluster.worker.id} created`);

    for (let i = 0; i < sockets; i++) {
        const socket = io(host, {
            path,
            withCredentials: true,
            timestampRequests: true,
            transports: ['websocket'],
            extraHeaders: {
                Cookie: cookie,
            },
        });

        socket.on('connect', () => {
            socket.emit('join', { roomName: cluster.worker.id % 3, context: {} });
            console.log(`worker ${cluster.worker.id}:`, 'connect');
        });

        socket.on('connect_error', (error) => {
            console.log(
                `worker ${cluster.worker.id}:`,
                'connect_error',
                error.message,
                error.description,
            );
        });

        socket.on('disconnect', (reason) => {
            console.log(`worker ${cluster.worker.id}:`, 'disconnect', reason);
        });

        socket.onAny((event, ...args) => {
            console.log(`worker ${cluster.worker.id}:`, event, JSON.stringify(args));
        });
    }
}
