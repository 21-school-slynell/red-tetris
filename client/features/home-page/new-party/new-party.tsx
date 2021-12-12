import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { showSnackBarAction } from 'client/core/store';
import { changeNameGame, createGame, getInitDataGame } from '../slice';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  grid: {
    display: 'grid',
    gap: 16,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function NewParty() {
  const classes = useStyles();

  const { name, login } = useSelector(getInitDataGame);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    dispatch(changeNameGame(value));
  };

  const handleClick = () => {
    if (name && login) {
      dispatch(createGame());
    } else {
      dispatch(
        showSnackBarAction({
          type: 'warning',
          msg: 'Enter your login or name party',
        }),
      );
    }
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={12} className={classes.grid}>
        <TextField
          variant="outlined"
          fullWidth
          name="name"
          label="party"
          placeholder="enter the name of the party"
          value={name}
          onChange={handleChange}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          endIcon={<PlayArrowIcon />}
        >
          Create
        </Button>
      </Grid>
    </div>
  );
}
