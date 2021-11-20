import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type SocketProps = {
    roomId: number;
    baseUrl: string;
    namespace?: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
enum NAME_EVENT {
    INIT = 'init',
    CONTROL = 'control',
    CONSUMPTION = 'consumption',
    EFFICIENCY = 'efficiency',
    HOURS = 'hours',
    TELEMETRY = 'main',
}

type DataSocketProps = {
    [key in NAME_EVENT]: any;
};

export const useSocketIo = () => {
    const [data, setData] = useState<DataSocketProps>({} as DataSocketProps);
    const socketRef = useRef<Socket>();

    useEffect(() => {
        const resolvedOptions = {
            path: '/socket/',
            withCredentials: true,
        };

        socketRef.current = io('', resolvedOptions);

        const socket = socketRef.current;
        if (socket) {
            Object.values(NAME_EVENT).forEach((key) => {
                socket.on(key, (response: any) => setData({ ...data, [key]: response }));
            });
        }
        return () => {
            socket?.disconnect();
        };
    }, []);

    const sendInitData = (dataBody: object) => {
        const socket = socketRef.current;
        if (socket) {
            socket.emit(NAME_EVENT.INIT, {
                ...dataBody,
            });
        }
    };

    const sendTelemetryData = (dataBody: object) => {
        const socket = socketRef.current;
        if (socket) {
            socket.emit(NAME_EVENT.TELEMETRY, dataBody);
        }
    };

    const sendControlData = (dataBody: object) => {
        const socket = socketRef.current;
        if (socket) {
            socket.emit(NAME_EVENT.CONTROL, {
                ...dataBody,
            });
        }
    };

    return {
        data,
        sendControlData,
        sendInitData,
        sendTelemetryData,
    };
};
