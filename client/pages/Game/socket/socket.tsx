import { useDispatch } from 'react-redux';
import React, { FC, memo, useEffect } from 'react';
import { useSocketIo } from './useSocketIo';

export const SocketIODemo: FC = memo(() => {
    const { data } = useSocketIo();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(data);
    }, [data, dispatch]);

    return <div />;
});
