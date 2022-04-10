import { Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusRooms } from '@core/store';
import { isServer } from 'client/core/store';
import AccordionGame from './accordion/accordion';
import { changeDescription, changeLogin, getInitDataGame } from './slice';

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
  input: {
    '&:invalid': {
      border: 'red solid 2px',
    },
  },
});

export const WrapperHomePage: FC = memo(() => {
  const classes = useStyles();
  const { login, description } = useSelector(getInitDataGame);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatusRooms());
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;

    switch (name) {
    case 'login':
      dispatch(changeLogin(value));
      break;
    case 'description':
      dispatch(changeDescription(value));
      break;
    default:
      break;
    }
  };

  return (
    <Paper className={classes.root}>
      <Grid item xs={12} md={6} className={classes.grid}>
        <TextField
          variant="outlined"
          fullWidth
          name="login"
          label="login"
          placeholder="enter your login"
          inputProps={{ className: classes.input, pattern: '[a-z]{1,15}' }}
          value={login}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          fullWidth
          name="description"
          label="description"
          placeholder="tell me something about yourself"
          value={description}
          onChange={handleChange}
        />
        <AccordionGame />
      </Grid>
    </Paper>
  );
});

const NullFC: FC = () => <></>;

export const HomePage = !isServer ? WrapperHomePage : NullFC;
