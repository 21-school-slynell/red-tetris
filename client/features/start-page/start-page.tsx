import { Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { FC, memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getStatusRooms } from '@core/store';
import { isServer } from 'client/core/store';
import ListRooms from './list-rooms/list-rooms';
import AccordionGame from './accordion/accordion';

const useStyles = makeStyles({
    root: {
        maxHeight: 1000,
        minHeight: 600,
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        padding: 24,
    },
    grid: {
        display: 'grid',
        gap: 16,
    },
});

type TypeStatusGame = 'game' | 'start' | 'finish';

export const WrapperGame: FC = memo(() => {
    const classes = useStyles();

    const [login, setLogin] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStatusRooms());
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;

        setLogin(value);
    };

    return (
        <Paper className={classes.root}>
            <Grid xs={12} md={6} className={classes.grid}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name={'name'}
                    label={'login'}
                    placeholder={'enter your login'}
                    value={login}
                    onChange={handleChange}
                />
                <AccordionGame />
            </Grid>
        </Paper>
    );
});

const NullFC: FC = () => <></>;

// export const Game = withAuth(!isServer ? WrapperGame : NullFC);
export const StartPage = !isServer ? WrapperGame : NullFC;
